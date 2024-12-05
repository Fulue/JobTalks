<?php

namespace Database\Factories;

use App\Models\View;
use Illuminate\Database\Eloquent\Factories\Factory;

class ViewFactory extends Factory
{
    protected $model = View::class;

    public function definition(): array
    {
        return [
            'viewable_id' => $this->faker->randomDigitNotNull,
            'viewable_type' => $this->faker->randomElement(['App\Models\Video', 'App\Models\Question']),
            'ip_address' => $this->faker->ipv4,
        ];
    }

    public function forViewable($viewable): self
    {
        return $this->state([
            'viewable_id' => $viewable->id,
            'viewable_type' => get_class($viewable),
        ]);
    }
}
