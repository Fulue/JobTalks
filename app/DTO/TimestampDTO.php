<?php

namespace App\DTO;

use App\Models\Timestamp;
use Spatie\LaravelData\Data;

class TimestampDTO extends Data
{
    public function __construct(
        public string $id,
        public string $url,
        public string $video_name,
        public string $start_time,
        public int $start_time_seconds,
        public array $tags,
    ) {}

    public static function fromModel(Timestamp $timestamp): self
    {
        $start_time = self::convertToSeconds($timestamp->start_time);

        return new self(
            id: $timestamp->id,
            url: $timestamp->video->url,
            video_name: $timestamp->video->name,
            start_time: $timestamp->start_time,
            start_time_seconds: $start_time,
            tags: TagDTO::collect($timestamp->tags()->get())->toArray(),
        );
    }

    private static function convertToSeconds(string $timecode): int
    {
        // Ожидаем формат времени HH:MM:SS
        if (preg_match('/^(\d{2}):(\d{2}):(\d{2})$/', $timecode, $matches)) {
            $hours = (int)$matches[1];
            $minutes = (int)$matches[2];
            $seconds = (int)$matches[3];

            return ($hours * 3600) + ($minutes * 60) + $seconds;
        }

        throw new \Exception("Некорректный формат времени: $timecode");
    }


}
