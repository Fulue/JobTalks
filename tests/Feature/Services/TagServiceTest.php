<?php

namespace Tests\Feature\Services;

use App\Models\Profession;
use App\Models\Question;
use App\Models\Tag;
use App\Services\TagService;

beforeEach(function () {
    // Создаём профессию
    $this->profession = Profession::factory()->create();

    // Создаём теги
    $this->tag1 = Tag::factory()->create();
    $this->tag2 = Tag::factory()->create();

    // Создаём вопросы, связанные с профессией
    $this->question1 = Question::factory()->create([
        'profession_id' => $this->profession->id,
    ]);
    $this->question2 = Question::factory()->create([
        'profession_id' => $this->profession->id,
    ]);

    // Прикрепляем теги к вопросам
    $this->question1->tags()->attach($this->tag1);
    $this->question1->tags()->attach($this->tag2);
    $this->question2->tags()->attach($this->tag1);  // Используем тот же тег для второго вопроса
});

// Тест получения тегов
it('проверяет правильность получения тегов для профессии', function () {
    // Создаём сервис для теста
    $tagService = new TagService();

    // Получаем теги для профессии
    $response = $tagService->getTags($this->profession);

    // Проверяем, что теги корректно возвращаются
    expect($response)->toBeArray('Ответ не является массивом')
        ->and(count($response))->toBe(2, 'Неверное количество тегов в ответе')
        ->and($response[0]['id'])->toBe($this->tag1->id, 'Тег 1 не совпадает с ожидаемым')
        ->and($response[1]['id'])->toBe($this->tag2->id, 'Тег 2 не совпадает с ожидаемым');
});
