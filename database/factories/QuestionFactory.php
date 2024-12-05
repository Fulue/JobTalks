<?php

namespace Database\Factories;

use App\Models\Profession;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class QuestionFactory extends Factory
{
    protected $model = Question::class;

    public function definition(): array
    {
        // Список тем для вопросов
        $topics = [
            'ООП',
            'Алгоритмы',
            'Базы данных',
            'Тестирование',
            'Архитектура',
            'PHP',
            'JavaScript',
            'REST API',
            'Микросервисы',
            'Безопасность',
            'Машинное обучение',
            'Оптимизация производительности',
            'Фреймворки',
        ];

        // Список технологий
        $technologies = [
            'Laravel',
            'Vue.js',
            'Docker',
            'Kubernetes',
            'React',
            'MySQL',
            'Redis',
            'Node.js',
            'GraphQL',
            'ElasticSearch',
            'AWS',
        ];

        // Роли в разработке
        $roles = [
            'разработчик',
            'инженер по безопасности',
            'тестировщик',
            'архитектор системы',
            'девопс инженер',
        ];

        // Шаблоны вопросов
        $templates = [
            'Что такое {topic} и как оно используется в {technology}?',
            'Какие основные принципы {topic} применимы в {role}?',
            'Как использовать {topic} и {technology} в реальных проектах?',
            'Расскажите о преимуществах {topic} и его применении в {technology}.',
            'Каковы типичные ошибки при работе с {topic} и как их избегать?',
            'В чем отличие {topic} от других подходов в {role}?',
            'Как улучшить производительность с помощью {topic} в {technology}?',
            'Объясните, почему {topic} важен(а) для {role}.',
            'Как тестировать {topic} с помощью {technology}?',
            'Какие инструменты и практики лучше использовать для {topic} в {role}?',
        ];

        // Выбор случайных элементов
        $topic = $this->faker->randomElement($topics);
        $technology = $this->faker->randomElement($technologies);
        $role = $this->faker->randomElement($roles);
        $template = $this->faker->randomElement($templates);

        // Генерация вопроса
        $question = str_replace(
            ['{topic}', '{technology}', '{role}'],
            [$topic, $technology, $role],
            $template
        );

        return [
            'question' => $question, // Генерируемый вопрос
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }


}
