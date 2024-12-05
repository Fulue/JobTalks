<?php

namespace App\DTO;

use App\Models\Level;
use App\Models\Profession;
use Spatie\LaravelData\Data;

class LevelDTO extends Data
{
    public function __construct(
        public string $id,
        public string $level,
        public string $icon,
    ) {}

    public static function fromModel(Level $level): self
    {
        return new self(
            id: $level->id,
            level: $level->level,
            icon: $level->icon,
        );
    }
}
