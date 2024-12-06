<?php

namespace App\Services;

use App\Models\Question;
use App\Models\View;
use Illuminate\Http\Request;

class ViewService
{
    public function addView(Request $request, Question $question): void
    {
        $ipAddress = $request->ip(); // Получаем IP адрес пользователя

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
