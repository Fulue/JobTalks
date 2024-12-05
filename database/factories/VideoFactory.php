<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class VideoFactory extends Factory
{
    protected $model = Video::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'url' => $this->faker->url(),
            'status' => $this->faker->randomElement(['processed', 'pending']),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'user_id' => User::factory(),
        ];
    }
}
