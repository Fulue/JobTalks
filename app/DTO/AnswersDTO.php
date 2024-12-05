<?php

namespace App\DTO;

use App\Models\Answer;
use Spatie\LaravelData\Data;

class AnswersDTO extends Data
{
    public function __construct(
        public string $id,
        public string $answer,
        public string|null $source,
        public string $created_at
    ) {}

    public static function fromModel(Answer $answer): self
    {
        return new self(
            id: $answer->id,
            answer: $answer->answer,
            source: $answer->source,
            created_at: $answer->created_at
        );
    }
}
