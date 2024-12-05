<?php

namespace Database\Factories;

use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class LevelFactory extends Factory
{
    protected $model = Level::class;

    public function definition(): array
    {
        // Список уровней
        $levels = [
            'Джуниор',
            'Мидл',
            'Сеньор',
            'Лид',
            'Тимлид',
            'Архитектор',
        ];

        // Список иконок из MDI (выбираем соответствующие иконки для уровней)
        $icons = [
            'mdi-account-badge',          // Джуниор
            'mdi-account-circle',          // Мидл
            'mdi-account-tie',             // Сеньор
            'mdi-account-supervisor',      // Лид
            'mdi-account-multiple',        // Тимлид
            'mdi-domain',                  // Архитектор
        ];

        // Выбираем случайный уровень и соответствующую иконку
        $level = $this->faker->randomElement($levels);
        $icon = $icons[array_search($level, $levels)];

        return [
            'level' => $level, // Случайный уровень из списка
            'icon' => $icon,   // Соответствующая иконка из blade-mdi
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }

}
