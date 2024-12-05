<?php

namespace Database\Factories;

use App\Models\Like;
use Illuminate\Database\Eloquent\Factories\Factory;

class LikeFactory extends Factory
{
    protected $model = Like::class;

    public function definition()
    {
        return [
            'ip_address' => $this->faker->ipv4, // Генерация случайного IP-адреса
            'reaction_type' => $this->faker->randomElement(['like', 'dislike']), // Тип реакции
            'likeable_id' => null, // Устанавливается при использовании
            'likeable_type' => null, // Устанавливается при использовании
        ];
    }

    public function forLikeable($model)
    {
        return $this->state(function () use ($model) {
            return [
                'likeable_id' => $model->id,
                'likeable_type' => get_class($model),
            ];
        });
    }
}
