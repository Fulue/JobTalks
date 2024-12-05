<?php

namespace Database\Factories;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class AnswerFactory extends Factory
{
    protected $model = Answer::class;

    public function definition(): array
    {
        // Шаблоны предложений для ответов
        $templates = [
            'Основные принципы {topic} включают {answer}.',
            'Ключевая особенность {topic} заключается в {answer}.',
            'Для работы с {topic} важно учитывать {answer}.',
            'Типичная ошибка в {topic} - это {answer}.',
            'Использование {topic} может улучшить {answer}.',
            '{topic} решает проблему {answer}.',
            'Лучший подход к {topic} - это {answer}.',
            '{answer} является основным преимуществом {topic}.',
            'Для тестирования {topic} рекомендуется использовать {answer}.',
            'Наиболее популярные инструменты для {topic} - это {answer}.',
            'Эффективное внедрение {topic} требует {answer}.',
            'Преимущество {topic} заключается в {answer}.',
            'Решение проблемы {topic} включает {answer}.',
            '{topic} упрощает процессы за счёт {answer}.',
            'Важно помнить, что {topic} работает лучше всего с {answer}.',
        ];

        // Варианты ответов
        $answers = [
            'инкапсуляция, наследование и полиморфизм',
            'оптимизация производительности',
            'безопасность данных',
            'использование неверных типов данных',
            'лучшую модульность и повторное использование кода',
            'снижение сложности архитектуры',
            'использование паттернов проектирования',
            'повышение гибкости и адаптивности к изменениям',
            'unit-тесты и интеграционные тесты',
            'Postman, PHPUnit, Jenkins, Docker',
            'обнаружение и исправление багов',
            'улучшение пользовательского интерфейса',
            'сокращение времени на разработку',
            'лучшая организация кода',
            'снижение рисков и уязвимостей',
        ];

        // Получаем связанный вопрос (если требуется)
        $question = Question::factory();

        // Генерация ответов
        $topic = $this->faker->word; // Можно заменить на реальные темы, если они есть
        $numSentences = rand(5, 15); // Случайное количество предложений (от 5 до 15)

        $answerText = '';
        for ($i = 0; $i < $numSentences; $i++) {
            // Выбираем случайные шаблон и ответ
            $template = $this->faker->randomElement($templates);
            $answer = $this->faker->randomElement($answers);
            // Формируем предложение и добавляем его к тексту ответа
            $sentence = str_replace(['{topic}', '{answer}'], [$topic, $answer], $template);
            $answerText .= $sentence . ' ';
        }

        // Возвращаем финальный ответ
        return [
            'answer' => trim($answerText), // Генерация ответа из 5-15 предложений
            'source' => $this->faker->optional()->url,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
