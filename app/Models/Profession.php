<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Profession
 *
 * @property string $id
 * @property string $profession
 * @property string $icon
 * @property string $icon_color
 * @property Video[]|HasMany $videos
 * @property Level[]|HasMany $levels
 * @property Question[]|HasMany $questions
 */
class Profession extends Model
{
    use HasFactory;
    use HasUuids;
    //use SoftDeletes;

    protected $fillable = ['profession','icon','icon_color'];

    /**
     * Связь профессии с видео (один ко многим)
     *
     * @return HasMany
     */
    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }

    /**
     * Связь профессии с уровнем (один ко многим)
     *
     * @return HasMany
     */
    public function levels(): HasMany
    {
        return $this->hasMany(Level::class);
    }

    /**
     * Связь профессии с вопросом (один ко многим)
     *
     * @return HasMany
     */
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}
