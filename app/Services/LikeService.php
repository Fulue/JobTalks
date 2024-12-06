<?php

namespace App\Services;

use App\Models\Like;
use App\Models\Question;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LikeService
{
    public function handleReaction(string $reaction, string $ipAddress, $questionId): JsonResponse
    {
        $question = Question::query()->findOrFail($questionId);

        $reactionType = $reaction; // "like" или "dislike"

        $like = $question->likes()->firstOrCreate([
            'ip_address' => $ipAddress,
        ], [
            'reaction_type' => $reactionType,
        ]);

        if (!$like->wasRecentlyCreated) {
            $like->update([
                'reaction_type' => $reactionType
            ]);
        }

        return response()->json(['result' => true]);
    }
}
