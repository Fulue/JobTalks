<?php

namespace App\Services;

use App\Models\Question;
use App\Models\View;
use Illuminate\Http\Request;

class ViewService
{
    public function addView(string $ipAddress, Question $question): void
    {
        $existingView = View::query()->where('viewable_id', $question->id)
            ->where('viewable_type', Question::class)
            ->where('ip_address', $ipAddress)
            ->first();

        if ($existingView) {
            return;
        }

        $question->views()->create(['ip_address' => $ipAddress]);
    }
}
