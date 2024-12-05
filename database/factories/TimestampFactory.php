<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\Timestamp;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TimestampFactory extends Factory
{
    protected $model = Timestamp::class;

    public function definition(): array
    {
        return [
            'question_text' => $this->faker->word,
            'start_time' => $this->faker->time,
            'end_time' => $this->faker->time,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'video_id' => Video::factory(),
        ];
    }
}
