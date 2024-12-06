<?php

namespace App\Http\Controllers;

use App\DTO\QuestionAnswersDTO;
use App\Models\Question;
use App\Services\QuestionService;
use App\Services\ViewService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;

class QuestionDetailsController extends Controller
{
    public function index(string $questionId, Request $request, QuestionService $questionService, ViewService $viewService): Response
    {
        $validator = Validator::make(['question_id' => $questionId], [
            'question_id' => 'required|exists:questions,id',
        ]);

        if ($validator->fails()) {
            abort(404, 'Вопрос не найден.');
        }

        $question = Question::query()->findOrFail($questionId);

        $viewService->addView($request->ip(), $question);

        return Inertia::render('question-details', [
            'question' => QuestionAnswersDTO::fromModel($question),
            'timestamps' => Inertia::defer(fn () => $questionService->getTimestamps($question)),
        ]);
    }
}
