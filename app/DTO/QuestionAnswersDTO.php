<?php

namespace App\DTO;

use App\Models\Answer;
use App\Models\Question;
use App\Models\Timestamp;
use Spatie\LaravelData\Data;

class QuestionAnswersDTO extends Data
{
    public function __construct(
        public string $id,
        public string $question,
        public string $profession,
        public string|null $level,
        public array $answers,
    ) {}

    public static function fromModel(Question $question): self
    {
        return new self(
            id: $question->id,
            question: $question->question,
            profession: $question->profession->profession,
            level: $question->level->level ?? null,
            answers: AnswersDTO::collect($question->answers()->get())->toArray(),
        );
    }
}
