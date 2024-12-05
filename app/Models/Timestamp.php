<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Timestamp
 *
 * @property string $id
 * @property string $question_text
 * @property string $start_time
 * @property string $end_time
 * @property string $video_id
 * @property string $question_id
 * @property Video $video
 *
 * @property Question[]|BelongsToMany $questions
 * @property Tag[]|MorphToMany $tags
 */
class Timestamp extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = ['start_time', 'end_time', 'video_id', 'question_id','question_text'];

    /**
     * Связь тайм-кода с видео (многие к одному)
     *
     * @return BelongsTo
     */
    public function video(): BelongsTo
    {
        return $this->belongsTo(Video::class);
    }

    /**
     * Определяет связь вопроса с тегами (многие ко многим) через морфологическую таблицу.
     *
     *
     * @return MorphToMany
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    /**
     * Связь тайм-кодов с вопросами (многие ко многим)
     *
     * @return BelongsToMany
     */
    public function questions(): BelongsToMany
    {
        return $this->belongsToMany(Question::class);
    }
}
