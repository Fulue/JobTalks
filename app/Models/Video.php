<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Video
 *
 * @property string $id
 * @property string $name
 * @property string $status
 * @property string $profession_id
 * @property string $level_id
 * @property int $user_id
 * @property Profession $profession
 * @property User $user
 * @property Level $level
 * @property Timestamp[]|HasMany $timestamps
 */
class Video extends Model
{
    use HasFactory;
    use HasUuids;
    //use SoftDeletes;

    protected $fillable = ['name', 'url', 'status', 'profession_id', 'level_id', 'user_id'];

    /**
     * Связь видео с профессией (многие к одному)
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Связь видео с профессией (многие к одному)
     *
     * @return BelongsTo
     */
    public function profession(): BelongsTo
    {
        return $this->belongsTo(Profession::class);
    }

    /**
     * Связь видео с уровнем (многие к одному)
     *
     * @return BelongsTo
     */
    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class);
    }

    /**
     * Связь видео с тайм-кодами (один ко многим)
     *
     * @return HasMany
     */
    public function timestamps(): HasMany
    {
        return $this->hasMany(Timestamp::class);
    }
}
