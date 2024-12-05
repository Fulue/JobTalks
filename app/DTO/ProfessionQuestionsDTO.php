<?php

namespace App\DTO;

use App\Models\Profession;
use Spatie\LaravelData\Data;

class ProfessionQuestionsDTO extends Data
{
    public function __construct(
        public string $id,
        public string $profession,
        public string $icon,
        public string $icon_color,
        public array $levels,
        public array $tags,
    ) {}

    public static function fromModel(Profession $profession): self
    {
        $tags = $profession->questions()
            ->with('tags')
            ->get()
            ->flatMap(fn($question) => $question->tags)
            ->unique('id');

        return new self(
            id: $profession->id,
            profession: $profession->profession,
            icon: $profession->icon,
            icon_color: $profession->icon_color,
            levels: LevelDTO::collect($profession->levels()->get())->toArray(),
            tags: TagDTO::collect($tags)->toArray(),
        );
    }
}
