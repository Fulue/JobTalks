<?php

namespace App\Filament\Resources\VideoResource\Pages;

use App\Filament\Resources\VideoResource;
use App\Models\Tag;
use App\Models\Timestamp;
use App\Models\Video;
use Filament\Actions;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Support\Facades\DB;

set_time_limit(300);

class ListVideos extends ListRecords
{
    protected static string $resource = VideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('import_questions')
                ->form([
                    Select::make('profession_id')
                        ->relationship('profession', 'profession')
                        ->required(),
                    Select::make('user_id')
                        ->relationship('user', 'name')
                        ->required(),
                    Textarea::make('json')
                        ->rows(10)
                        ->cols(20)
                        ->required()
                        ->placeholder('Введите JSON здесь...'),
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

                        // Добавляем видео и таймкоды
                        collect($json)->each(function ($record) use ($data, $formatTimecode) {
                            // Создаем видео
                            $video = Video::create([
                                'name' => $record['name'],
                                'url' => $record['link'],
                                'user_id' => $data['user_id'],
                                'profession_id' => $data['profession_id'],
                                'status' => 'processed',
                            ]);

                            // Добавляем таймкоды и теги
                            collect($record['questions'])->each(function ($question) use ($video, $formatTimecode) {
                                // Форматируем таймкод
                                $formattedTimecode = $formatTimecode($question['timecode']);

                                // Создаем таймкод
                                $timestamp = Timestamp::create([
                                    'start_time' => $formattedTimecode,
                                    'question_text' => $question['question'],
                                    'video_id' => $video->id,
                                ]);

                                // Обрабатываем теги
                                foreach ($question['tags'] as $tagName) {
                                    // Найти или создать тег
                                    $tag = Tag::firstOrCreate(['tag' => $tagName], ['color' => '']);
                                    // Привязать тег к таймкоду
                                    $timestamp->tags()->syncWithoutDetaching([$tag->id]);
                                }
                            });
                        });

                        DB::commit(); // Подтверждаем транзакцию
                    } catch (\Exception $e) {
                        DB::rollBack(); // Откатываем изменения
                        throw $e; // Выбрасываем исключение для уведомления пользователя
                    }
                })
                ->color('info')
                ->label('Import Video Json'),
        Actions\CreateAction::make(),
        ];
    }
}
