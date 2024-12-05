<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Tag
 *
 * @property string $id
 * @property string $tag
 * @property string $icon
 * @property string $color
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 *
 * @property-read Question[]|BelongsToMany $questions
 * @property-read Timestamp[]|BelongsToMany $timestamps
 */
class Tag extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = ['tag','icon', 'color'];

    /**
     * Связь тега с вопросами (полиморфная связь)
     *
     * @return MorphToMany
     */
    public function questions(): MorphToMany
    {
        return $this->morphedByMany(Question::class, 'taggable');
    }

    /**
     * Связь тега с таймкодами (полиморфная связь)
     *
     * @return MorphToMany
     */
    public function timestamps(): MorphToMany
    {
        return $this->morphedByMany(Timestamp::class, 'taggable');
    }
}
