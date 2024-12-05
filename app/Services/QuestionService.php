<?php

namespace App\Services;

use App\DTO\TimestampDTO;
use App\Models\Profession;
use App\Models\Question;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\DTO\QuestionDTO;

class QuestionService
{
    public function getQuestions(Profession $profession): array
    {
        $questions = QueryBuilder::for($profession->questions())
            ->allowedFilters([
                AllowedFilter::callback('tags', function ($query, $tagId) {
                    return $query->whereHas('tags', function ($tagQuery) use ($tagId) {
                        $tagQuery->where('tag_id', $tagId);
                    });
                }),
                AllowedFilter::callback('search', function ($query, $search) {
                    return $query->where('question', 'like', "%{$search}%");
                })
            ])
            ->orderByDesc('percentage')
            ->limit(50)
            ->paginate(50);

        $total = $questions->total();
        $lastPage = $questions->lastPage();
        $items = $questions->collect();

        return [
            'items' => QuestionDTO::collect($items)->toArray(),
            'lastPage' => $lastPage,
            'total' => $total
        ];
    }

    public function getTimestamps(Question $question): array
    {
        $timestamps = $question->timestamps()
            ->with('tags')
            ->orderByDesc('pivot_similarity')
            ->limit(5)
            ->get();

        return TimestampDTO::collect($timestamps)->toArray();
    }

    public function recalculatePercentages(): void
    {
        // Задаём минимальный и максимальный предел процентов
        $minPercentage = 10.4;
        $maxPercentage = 96.3;

        // Определяем веса для параметров
        $SIMILARITY_WEIGHT = 0.4;   // Процент схожести
        $TIMESTAMP_WEIGHT = 0.6;    // Количество таймкодов
        $TIME_WEIGHT = 0.2;         // Время таймкодов
        $TAG_WEIGHT = 0.3;          // Совпадение тегов
        $COMPLEXITY_WEIGHT = 0.2;   // Сложность вопроса

        // Получаем уникальные профессии
        $professions = Question::select('profession_id')->distinct()->pluck('profession_id');

        foreach ($professions as $professionId) {
            // Получаем все вопросы для профессии
            $questions = Question::where('profession_id', $professionId)
                ->withCount(['timestamps'])
                ->get();

            if ($questions->isEmpty()) {
                continue; // Пропускаем профессию, если вопросов нет
            }

            // Определяем максимальное количество таймкодов
            $maxTimestampsCount = $questions->max('timestamps_count');

            // Если ни у одного вопроса нет таймкодов, устанавливаем процент в минимальное значение
            if ($maxTimestampsCount == 0) {
                $questions->each(fn($question) => $question->update(['percentage' => $minPercentage]));
                continue;
            }

            // Рассчитываем проценты для каждого вопроса
            $rawPercentages = []; // Для хранения необработанных значений
            foreach ($questions as $question) {
                $timestamps = $question->timestamps()->withPivot('similarity')->get();

                // Нормализуем количество таймкодов
                $normalizedTimestamps = $question->timestamps_count / $maxTimestampsCount;

                // Устанавливаем normalizedSimilarity по новому правилу
                $highSimilarityCount90_95 = $timestamps->filter(function ($timestamp) {
                    $similarity = $timestamp->pivot->similarity;
                    return $similarity >= 90 && $similarity <= 95;
                })->count();

                $highSimilarityCount85_90 = $timestamps->filter(function ($timestamp) {
                    $similarity = $timestamp->pivot->similarity;
                    return $similarity >= 85 && $similarity < 90;
                })->count();

                if ($highSimilarityCount90_95 > 2) {
                    $normalizedSimilarity = 0.9; // 90%
                } elseif ($highSimilarityCount85_90 > 4) {
                    $normalizedSimilarity = 0.7; // 70%
                } else {
                    $normalizedSimilarity = 0.6; // 60%
                }

                // Рассчитываем влияние времени
                $timeScoreSum = $timestamps->sum(function ($timestamp) {
                    [$hours, $minutes, $seconds] = sscanf($timestamp->start_time, "%d:%d:%d");
                    $timeInMinutes = $hours * 60 + $minutes;

                    return match (true) {
                        $timeInMinutes <= 20 => 0.7,  // 70%
                        $timeInMinutes <= 40 => 0.5,  // 50%
                        $timeInMinutes <= 60 => 0.3,  // 30%
                        $timeInMinutes >= 110 => 0.1, // 10% (от 1:50)
                        default => 0.2,              // 20% по умолчанию
                    };
                });
                $normalizedTime = $timestamps->count() > 0 ? $timeScoreSum / $timestamps->count() : 0;

                // Рассчитываем совпадение тегов
                $questionTags = $question->tags->pluck('id')->toArray();
                $allTimestampTags = $timestamps->flatMap(fn($timestamp) => $timestamp->tags->pluck('id'))->toArray();
                $commonTagsCount = count(array_intersect($questionTags, $allTimestampTags)); // Количество совпадающих тегов
                $uniqueTagsCount = count(array_unique(array_merge($questionTags, $allTimestampTags))); // Всего уникальных тегов

                // Рассчитываем процент совпадений тегов
                $normalizedTags = $uniqueTagsCount > 0 ? $commonTagsCount / $uniqueTagsCount : 0;

                // Рассчитываем сложность вопроса
                $ease = $question->ease / 5; // Предполагаем, что ease в диапазоне от 1 до 5, нормализуем к 1

                // Комбинируем веса
                $combinedWeight =
                    $TIMESTAMP_WEIGHT * $normalizedTimestamps +
                    $SIMILARITY_WEIGHT * $normalizedSimilarity +
                    $TIME_WEIGHT * $normalizedTime +
                    $TAG_WEIGHT * $normalizedTags +
                    $COMPLEXITY_WEIGHT * (1 - $ease); // Инвертируем сложность, т.к. сложные вопросы имеют меньшую вероятность

                // Вычисляем процент
                $rawPercentages[$question->id] = $minPercentage + $combinedWeight * ($maxPercentage - $minPercentage);
            }

            // Нормализуем проценты всех вопросов профессии
            $minRaw = min($rawPercentages);
            $maxRaw = max($rawPercentages);

            foreach ($questions as $question) {
                $rawPercentage = $rawPercentages[$question->id];
                if ($maxRaw > $minRaw) {
                    // Масштабируем значения к диапазону $minPercentage - $maxPercentage
                    $normalizedPercentage = $minPercentage + ($rawPercentage - $minRaw) / ($maxRaw - $minRaw) * ($maxPercentage - $minPercentage);
                } else {
                    // Если все значения одинаковые, устанавливаем одно значение
                    $normalizedPercentage = $minPercentage;
                }

                // Обновляем процент в вопросе
                $question->update(['percentage' => round($normalizedPercentage, 2)]);
            }
        }
    }
}
