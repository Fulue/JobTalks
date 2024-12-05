<?php

namespace Tests\Feature\Services;

use App\Models\Question;
use App\Models\View;
use App\Services\ViewService;
use Illuminate\Http\Request;

beforeEach(function () {
    $this->question = Question::factory()->create();
});

it('проверяет добавление просмотра для вопроса', function () {
    // Мокаем запрос с IP
    $request = Request::create('/');
    $request->setTrustedProxies(['127.0.0.1'], 0);

    $viewService = new ViewService();

    // Вызываем метод для добавления просмотра
    $viewService->addView($request, $this->question);

    // Проверяем, что запись добавлена в таблицу views
    expect(View::query()->where('viewable_id', $this->question->id)
        ->where('ip_address', '127.0.0.1')->exists())
        ->toBeTrue('Просмотр не был добавлен в таблицу views для данного IP');
});

it('проверяет добавление просмотра с уже существующим IP', function () {
    // Мокаем запрос с IP
    $request = Request::create('/');
    $request->setTrustedProxies(['127.0.0.1'], 0);

    // Создаём существующий просмотр
    View::query()->create([
        'viewable_id' => $this->question->id,
        'viewable_type' => Question::class,
        'ip_address' => '127.0.0.1',
    ]);

    $viewService = new ViewService();

    // Вызываем метод для добавления просмотра
    $viewService->addView($request, $this->question);

    // Проверяем, что не добавился второй просмотр
    expect(View::query()->where('viewable_id', $this->question->id)
        ->where('ip_address', '127.0.0.1')->count())
        ->toBe(1, 'Для данного IP уже существует просмотр, и не должен быть добавлен второй');
});


