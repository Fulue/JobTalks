<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

/**
 * Class Question
 *
 * @property string $id
 * @property string $question
 * @property float $percentage
 * @property int $ease
 * @property Timestamp[]|BelongsToMany $timestamps
 * @property Answer[]|HasMany $answers
 * @property Tag[]|MorphToMany $tags
 * @property Profession $profession
 * @property Level $level
 * @property View[]|MorphMany $views
 * @property Like[]|MorphMany $likes
 */
class Question extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = ['question', 'profession_id', 'level_id', 'percentage', 'ease'];

    /**
     * Связь вопроса с ответами (один ко многим)
     *
     * @return HasMany
     */
    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * Определяет связь вопроса с тайм-кодами (многие ко многим)
     *
     * @return BelongsToMany
     */
    public function timestamps(): BelongsToMany
    {
        return $this->belongsToMany(Timestamp::class)->withPivot('similarity');
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
     * Связь вопроса с профессией (многие к одному)
     *
     * @return BelongsTo
     */
    public function profession(): BelongsTo
    {
        return $this->belongsTo(Profession::class);
    }

    /**
     * Связь вопроса с уровнем (многие к одному)
     *
     * @return BelongsTo
     */
    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class);
    }

    /**
     * Определяет связь вопроса с просмотрами (полиморфная связь один ко многим).
     *
     * @return MorphMany
     */
    public function views(): MorphMany
    {
        return $this->morphMany(View::class, 'viewable');
    }

    /**
     * Определяет связь вопроса с лайками (полиморфная связь один ко многим).
     *
     * @return MorphMany
     */
    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }

}
