<?php

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TagFactory extends Factory
{
    protected $model = Tag::class;

    public function definition(): array
    {
        $tags = [
            'Общие вопросы',
            'ООП',
            'Алгоритмы',
            'Базы данных',
            'Тестирование',
            'Архитектура',
            'PHP',
            'JavaScript',
            'HTML/CSS',
            'DevOps',
            'Системы контроля версий',
            'REST API',
            'Микросервисы',
            'Безопасность',
            'Машинное обучение',
            'Реактивное программирование',
            'Функциональное программирование',
            'Паттерны проектирования',
            'Фреймворки',
            'Оптимизация производительности',
        ];

        $colors = [
            'bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500',
            'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
            'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500',
            'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500',
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500',
            'bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-500',
            'bg-lime-100 text-lime-800 dark:bg-lime-800/30 dark:text-lime-500',
            'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500',
            'bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-500',
            'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-500',
        ];

        return [
            'tag' => $this->faker->randomElement($tags), // Случайный тег из списка
            'color' => $this->faker->randomElement($colors), // Случайный цвет из списка
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }

}
