<?php

namespace App\DTO;

use App\Models\Profession;
use App\Models\Tag;
use Spatie\LaravelData\Data;

class TagDTO extends Data
{
    public function __construct(
        public string $id,
        public string $tag,
        public string $color,
    ) {}

    public static function fromModel(Tag $tag): self
    {
        return new self(
            id: $tag->id,
            tag: $tag->tag,
            color: $tag->color,
        );
    }
}
