<?php

namespace App\Services;

use App\Models\Like;
use App\Models\Question;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LikeService
{
    public function handleReaction(Request $request, $questionId): JsonResponse
    {
        $question = Question::query()->findOrFail($questionId);

        $reactionType = $request->input('reaction'); // "like" или "dislike"

        $like = Like::query()->firstOrCreate([
            'likeable_id' => $question->id,
            'likeable_type' => Question::class,
            'ip_address' => $request->ip(),
        ], [
            'reaction_type' => $reactionType,
        ]);

        if (!$like->wasRecentlyCreated) {
            $like->update([
                'reaction_type' => $reactionType
            ]);
            return response()->json(['result' => true, 'reaction' => $like->reaction_type]);
        }

        return response()->json(['result' => true, 'reaction' => $reactionType]);
    }
}
