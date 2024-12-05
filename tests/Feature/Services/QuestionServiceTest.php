<?php

namespace Tests\Feature\Services;

use App\Models\Profession;
use App\Models\Question;
use App\Models\Tag;
use App\Services\QuestionService;

beforeEach(function () {
    $this->profession = Profession::factory()->create();
    $this->question = Question::factory()->create(['profession_id' => $this->profession->id]);
    $this->tag = Tag::factory()->create();
    $this->question->tags()->attach($this->tag);
});

it('проверяет правильность получения вопросов для профессии', function () {
    // Создаём сервис для теста
    $questionService = new QuestionService();

    // Получаем вопросы
    $response = $questionService->getQuestions($this->profession);

    // Проверяем, что вопросы корректно возвращаются
    expect($response['items'])->toBeArray('Ошибка получения списка вопросов для профессии')
        ->and($response['total'])->toBeGreaterThan(0, 'Ошибка: количество вопросов должно быть больше 0')
        ->and($response['lastPage'])->toBeGreaterThan(0, 'Ошибка: последняя страница должна быть больше 0');
});

it('проверяет правильность получения тайм-кодов для вопроса', function () {
    // Создаём сервис для теста
    $questionService = new QuestionService();

    // Получаем timestamp'ы для вопроса
    $response = $questionService->getTimestamps($this->question);

    // Проверяем, что timestamp'ы корректно возвращаются
    expect($response)->toBeArray('Ошибка получения тайм-кодов для вопроса');
});

