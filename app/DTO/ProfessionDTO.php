<?php

namespace App\DTO;

use App\Models\Profession;
use Spatie\LaravelData\Data;

class ProfessionDTO extends Data
{
    public function __construct(
        public string $id,
        public string $profession,
        public int $count,
        public string $icon,
    ) {}

    public static function fromModel(Profession $profession): self
    {
        return new self(
            id: $profession->id,
            profession: $profession->profession,
            count: $profession->questions->count(),
            icon: $profession->icon,
        );
    }
}
