<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Answer
 *
 * @property string $id
 * @property string $answer
 * @property string $source
 * @property string $question_id
 * @property Question $question
 */
class Answer extends Model
{
    use HasFactory;
    use HasUuids;
    //use SoftDeletes;

    protected $fillable = ['answer', 'question_id', 'source'];

    /**
     * Связь ответа с вопросом (многие к одному)
     *
     * @return BelongsTo
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}
