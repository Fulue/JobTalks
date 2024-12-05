<?php

namespace App\Services;

use App\Models\Profession;
use App\DTO\TagDTO;

class TagService
{
    public function getTags(Profession $profession): array
    {
        $tags = $profession->questions()
            ->with('tags')
            ->get()
            ->flatMap(fn($question) => $question->tags)
            ->unique('id');

        return TagDTO::collect($tags)->toArray();
    }
}
