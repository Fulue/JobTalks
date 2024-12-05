<?php

namespace Database\Factories;

use App\Models\Profession;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ProfessionFactory extends Factory
{
    protected $model = Profession::class;

    // Массивы для профессий, иконок и цветов
    protected static $professions = [
        'C Разработчик' => ['icon' => 'mdi-language-c', 'color' => 'text-blue-600'],
        'C++ Разработчик' => ['icon' => 'mdi-language-cpp', 'color' => 'text-green-600'],
        'C# Разработчик' => ['icon' => 'mdi-language-csharp', 'color' => 'text-purple-600'],
        'JavaScript Разработчик' => ['icon' => 'mdi-language-javascript', 'color' => 'text-yellow-500 dark:text-yellow-600'],
        'GO Разработчик' => ['icon' => 'mdi-language-go', 'color' => 'text-blue-500'],
        'PHP Разработчик' => ['icon' => 'mdi-language-php', 'color' => 'text-indigo-600'],
        'Python Разработчик' => ['icon' => 'mdi-language-python', 'color' => 'text-teal-500'],
        'React Разработчик' => ['icon' => 'mdi-react', 'color' => 'text-sky-500'],
        'Java Разработчик' => ['icon' => 'mdi-language-java', 'color' => 'text-red-500'],
        'Vue.js Разработчик' => ['icon' => 'mdi-vuejs', 'color' => 'text-green-500'],
        'Nuxt.js Разработчик' => ['icon' => 'mdi-nuxt', 'color' => 'text-green-400'],
        'Laravel Разработчик' => ['icon' => 'mdi-laravel', 'color' => 'text-red-700'],
        'Swift Разработчик' => ['icon' => 'mdi-language-swift', 'color' => 'text-orange-500'],
        'Ruby Разработчик' => ['icon' => 'mdi-language-ruby', 'color' => 'text-red-600'],
        'Rust Разработчик' => ['icon' => 'mdi-language-rust', 'color' => 'text-brown-600'],
        'TypeScript Разработчик' => ['icon' => 'mdi-language-typescript', 'color' => 'text-blue-700']
    ];

    // Переменная для отслеживания уже использованных профессий
    protected static $usedProfessions = [];

    public function definition(): array
    {
        // Получаем оставшиеся профессии (те, что еще не использованы)
        $availableProfessions = array_diff_key(self::$professions, self::$usedProfessions);

        // Если профессии закончились, сбрасываем массив использованных профессий
        if (empty($availableProfessions)) {
            self::$usedProfessions = [];
            $availableProfessions = self::$professions;
        }

        // Выбираем случайную профессию из доступных
        $profession = $this->faker->randomElement(array_keys($availableProfessions));

        // Добавляем профессию в список использованных
        self::$usedProfessions[$profession] = true;

        return [
            'profession' => $profession,
            'icon' => self::$professions[$profession]['icon'],
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
