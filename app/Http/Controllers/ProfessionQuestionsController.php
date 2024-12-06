<?php

namespace App\Http\Controllers;

use App\DTO\ProfessionDTO;
use App\Models\Profession;
use App\Services\LikeService;
use App\Services\QuestionService;
use App\Services\TagService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class ProfessionQuestionsController extends Controller
{
    public function reactionQuestion(string $questionId, Request $request, LikeService $likeService): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'reaction' => 'required|in:like,dislike',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        return $likeService->handleReaction($request->input('reaction'), $request->ip(), $questionId);
    }

    public function index(string $professionId, QuestionService $questionService, TagService $tagService): Response
    {
        $validator = Validator::make(['profession_id' => $professionId], [
            'profession_id' => 'required|exists:professions,id', // Проверка, что professionId существует в базе
        ]);

        if ($validator->fails()) {
            abort(404, 'Профессия не найдена.');
        }

        $profession = Profession::query()->find($professionId);

        return Inertia::render('questions', [
            'questions' => Inertia::defer(fn () => $questionService->getQuestions($profession)),
            'tags' => Inertia::defer(fn () => $tagService->getTags($profession)),
            'profession' => fn() => ProfessionDTO::fromModel($profession),
        ]);
    }
}
