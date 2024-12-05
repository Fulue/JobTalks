<?php

namespace App\DTO;

use App\Models\Question;
use App\Models\Like;
use Spatie\LaravelData\Data;

class QuestionDTO extends Data
{
    public function __construct(
        public string $id,
        public string $question,
        public int $ease,
        public int $views,
        public string|null $level,
        public string|null $level_icon,
        public array $tags,
        public float $percentage,
        public string|false $user_reaction
    ) {}

    public static function fromModel(Question $question): self
    {
        // Проверяем реакцию пользователя по его IP
        $userReaction = Like::where('likeable_id', $question->id)
            ->where('likeable_type', Question::class)
            ->where('ip_address', request()->ip())
            ->first();

        // Если пользователь поставил лайк или дизлайк, возвращаем тип реакции. Иначе, false.
        $reaction = $userReaction ? $userReaction->reaction_type : false;

        return new self(
            id: $question->id,
            question: $question->question,
            ease: $question->ease,
            views: $question->views()->count(),
            level: $question->level->level ?? null,
            level_icon: $question->level->icon ?? null,
            tags: TagDTO::collect($question->tags()->get())->toArray(),
            percentage: round($question->percentage, 2),
            user_reaction: $reaction,
        );
    }
}
