<?php


namespace App\Filament\Resources\QuestionResource\Pages;

use App\Filament\Resources\QuestionResource;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Tag;
use App\Models\Timestamp;
use App\Services\QuestionService;
use Filament\Actions;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Support\Facades\DB;


set_time_limit(600);
class ListQuestions extends ListRecords
{
    protected static string $resource = QuestionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('recalculatePercentages')
                ->label('Recalculate Percentages')
                ->action(function (QuestionService $questionService): void {
                    // Вызываем метод пересчета процентов для всех вопросов
                    $questionService->recalculatePercentages();
                })
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading('Confirm Recalculation'),

            Actions\Action::make('import')
                ->form([
                    Select::make('profession_id')
                        ->relationship('profession', 'profession')
                        ->required(),
                    Textarea::make('json')
                        ->rows(10)
                        ->cols(20)
                        ->required()
                        ->placeholder('Введите JSON здесь...'),
                ])
                ->action(function (array $data, QuestionService $questionService): void {
                    DB::beginTransaction(); // Начинаем транзакцию

                    try {
                        // Декодируем JSON
                        $json = json_decode($data['json'], true);

                        // Проверяем, правильно ли декодировался JSON
                        if (json_last_error() !== JSON_ERROR_NONE) {
                            throw new \Exception('Некорректный JSON: ' . json_last_error_msg());
                        }

                        // Функция для форматирования таймкода
                        $formatTimecode = function (string $timecode): string {
                            // Попытка обработать формат с часами, минутами, секундами и миллисекундами (1:01:10:780)
                            if (preg_match('/^(\d{1,2}):(\d{2}):(\d{2}):(\d{3})$/', $timecode, $matches)) {
                                $hours = str_pad($matches[1], 2, '0', STR_PAD_LEFT);
                                $minutes = str_pad($matches[2], 2, '0', STR_PAD_LEFT);
                                $seconds = str_pad($matches[3], 2, '0', STR_PAD_LEFT);
                                return "{$hours}:{$minutes}:{$seconds}";
                            }

                            // Попытка обработать формат с миллисекундами, но без часов (30:39:770)
                            if (preg_match('/^(\d{1,2}):(\d{2}):(\d{3})$/', $timecode, $matches)) {
                                // Здесь мы проверяем, не превышает ли минуты 59
                                if ((int)$matches[1] > 59) {
                                    // Если минуты больше 59, обрабатываем как формат с часами
                                    $minutes = (int) $matches[1];
                                    $seconds = str_pad($matches[2], 2, '0', STR_PAD_LEFT);
                                    $milliseconds = str_pad($matches[3], 3, '0', STR_PAD_LEFT);

                                    // Переводим минуты больше 59 в часы
                                    $hours = str_pad(floor($minutes / 60), 2, '0', STR_PAD_LEFT);
                                    $minutes = str_pad($minutes % 60, 2, '0', STR_PAD_LEFT);

                                    return "{$hours}:{$minutes}:{$seconds}";
                                } else {
                                    // Если минуты <= 59, добавляем 00 для часов
                                    $hours = '00';
                                    $minutes = str_pad($matches[1], 2, '0', STR_PAD_LEFT);
                                    $seconds = str_pad($matches[2], 2, '0', STR_PAD_LEFT);
                                    return "{$hours}:{$minutes}:{$seconds}";
                                }
                            }

                            // Попытка обработать старый формат с запятой (00:30:39,770)
                            if (preg_match('/^(\d{1,2}):(\d{2}):(\d{2}),(\d{3})$/', $timecode, $matches)) {
                                $hours = str_pad($matches[1], 2, '0', STR_PAD_LEFT);
                                $minutes = str_pad($matches[2], 2, '0', STR_PAD_LEFT);
                                $seconds = str_pad($matches[3], 2, '0', STR_PAD_LEFT);
                                return "{$hours}:{$minutes}:{$seconds}";
                            }

                            // Если формат уже правильный (01:02:03)
                            if (preg_match('/^(\d{1,2}):(\d{2}):(\d{2})$/', $timecode, $matches)) {
                                $hours = str_pad($matches[1], 2, '0', STR_PAD_LEFT);
                                $minutes = str_pad($matches[2], 2, '0', STR_PAD_LEFT);
                                $seconds = str_pad($matches[3], 2, '0', STR_PAD_LEFT);
                                return "{$hours}:{$minutes}:{$seconds}";
                            }

                            // Если формат не соответствует ни одному из ожидаемых
                            throw new \Exception("Некорректный формат таймкода: $timecode");
                        };

                        // Регулярное выражение для извлечения таймкода и текста вопроса
                        $pattern = '/^(?P<start_time>\d{1,2}:\d{2}:\d{2},\d{3}) - (?P<question_text>.+)$/';

                        // Обрабатываем каждую запись
                        collect($json)->each(function ($record) use ($pattern, $data, $formatTimecode) {
                            // Создаем уникальный вопрос
                            $uniqueQuestion = Question::create([
                                'question' => $record['unique_question'],
                                'profession_id' => $data['profession_id'],
                            ]);

                            // Привязываем теги к вопросу
                            foreach ($record['tags'] as $tagName) {
                                $tag = Tag::firstOrCreate(['tag' => $tagName], ['color' => '']);
                                $uniqueQuestion->tags()->attach($tag->id);
                            }

                            // Обрабатываем похожие вопросы
                            foreach ($record['most_similar_questions'] as $similarQuestion) {
                                // Разбиваем строку вопроса на таймкод и текст вопроса
                                if (preg_match($pattern, $similarQuestion['question'], $matches)) {
                                    // Получаем таймкод и текст вопроса
                                    $startTime = $matches['start_time'];
                                    $questionText = $matches['question_text'];

                                    // Форматируем таймкод
                                    $formattedTimecode = $formatTimecode($startTime);

                                    // Ищем существующий таймкод по тексту вопроса и времени начала
                                    $timestamp = Timestamp::query()
                                        ->where('question_text', $questionText)
                                        ->where('start_time', $formattedTimecode)
                                        ->first();

                                    // Если таймкод не найден, создаем новый
                                    if (!$timestamp) {
                                        break;
                                    }

                                    // Привязываем таймкод к уникальному вопросу с указанием сходства
                                    $uniqueQuestion->timestamps()->attach($timestamp->id, [
                                        'similarity' => $similarQuestion['similarity'],
                                    ]);
                                }
                            }
                        });

                        DB::commit(); // Подтверждаем транзакцию

                        // Вызываем метод пересчета процентов для всех вопросов
                        $questionService->recalculatePercentages();
                    } catch (\Exception $e) {
                        DB::rollBack(); // Откатываем изменения
                        throw $e; // Выбрасываем исключение для уведомления пользователя
                    }
                })
                ->color('info')
                ->label('Import Json'),

            Actions\Action::make('import_answers')
                ->form([
                    Select::make('profession_id')
                        ->relationship('profession', 'profession')
                        ->required(),
                    Textarea::make('json')
                        ->rows(10)
                        ->cols(20)
                        ->required()
                        ->placeholder('Введите JSON с ответами...'),
                ])
                ->action(function (array $data): void {
                    DB::beginTransaction(); // Начинаем транзакцию

                    try {
                        // Декодируем JSON
                        $json = json_decode($data['json'], true);

                        // Проверяем, правильно ли декодировался JSON
                        if (json_last_error() !== JSON_ERROR_NONE) {
                            throw new \Exception('Некорректный JSON: ' . json_last_error_msg());
                        }

                        // Обрабатываем каждый вопрос и его ответ
                        collect($json['questions'])->each(function ($record) use ($data) {
                            // Находим вопрос по его тексту (можно изменить на другой критерий, если нужно)
                            $question = Question::where('question', $record['question'])->first();

                            if ($question) {

                                $question->update([
                                    'ease' => $record['ease'], // Обновляем поле ease
                                ]);

                                // Если вопрос найден, создаём или обновляем ответ
                                $answer = Answer::updateOrCreate(
                                    ['question_id' => $question->id],
                                    [
                                        'answer' => $record['answer'],
                                    ]
                                );
                            }
                        });

                        DB::commit(); // Подтверждаем транзакцию
                    } catch (\Exception $e) {
                        DB::rollBack(); // Откатываем изменения
                        throw $e; // Выбрасываем исключение для уведомления пользователя
                    }
                })
                ->color('info')
                ->label('Import Answers'),
            Actions\CreateAction::make(),
        ];
    }
}
