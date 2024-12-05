<?php

namespace Tests\Feature\Services;

use App\Models\Question;
use App\Models\Like;
use App\Services\LikeService;
use Illuminate\Http\Request;

beforeEach(function () {
    $this->question = Question::factory()->create();
});

// Тест добавления нового лайка
it('добавляет реакцию лайка, если её нет для данного IP', function () {
    $request = Request::create('/', 'POST', ['reaction' => 'like']);
    $request->setTrustedProxies(['127.0.0.1'], 0); // Устанавливаем доверенный прокси для IP

    $likeService = new LikeService();

    // Вызываем метод для добавления лайка
    $response = $likeService->handleReaction($request, $this->question->id);

    // Проверяем, что лайк добавлен
    $like = Like::query()->where('likeable_id', $this->question->id)
        ->where('ip_address', '127.0.0.1')
        ->first();
    expect($like)->not()->toBeNull('Лайк не был добавлен')
        ->and($like->reaction_type)->toBe('like', 'Неверная реакция при добавлении лайка');

    // Преобразуем ответ в массив
    $responseData = $response->getData(true);

    // Проверяем ответ
    expect($responseData['result'])->toBeTrue('Не удалось добавить лайк')
        ->and($responseData['reaction'])->toBe('like', 'Неверная реакция при добавлении лайка');
});

// Тест обновления существующего лайка
it('обновляет реакцию лайка, если лайк уже существует', function () {
    // Создаем существующий лайк
    Like::query()->create([
        'likeable_id' => $this->question->id,
        'likeable_type' => Question::class,
        'ip_address' => '127.0.0.1',
        'reaction_type' => 'like',
    ]);

    $request = Request::create('/', 'POST', ['reaction' => 'dislike']);
    $request->setTrustedProxies(['127.0.0.1'], 0); // Устанавливаем доверенный прокси для IP

    $likeService = new LikeService();

    // Вызываем метод для обновления лайка
    $response = $likeService->handleReaction($request, $this->question->id);

    // Проверяем, что лайк обновился
    $like = Like::query()->where('likeable_id', $this->question->id)
        ->where('ip_address', '127.0.0.1')
        ->first();
    expect($like->reaction_type)->toBe('dislike', 'Лайк не был обновлен на dislike');

    // Преобразуем ответ в массив
    $responseData = $response->getData(true);

    // Проверяем содержимое ответа
    expect($responseData['result'])->toBeTrue("Ошибка при обновлении лайка")
        ->and($responseData['reaction'])->toBe('dislike', 'Неверная реакция при обновлении лайка');
});

