<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Class Like
 *
 * @property string $id
 * @property string $user_id
 * @property string $ip_address
 * @property string $reaction_type
 * @property string $likeable_id
 * @property string $likeable_type
 * @property-read Model|MorphTo $likeable
 */
class Like extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [ 'ip_address', 'reaction_type', 'likeable_id', 'likeable_type'];

    /**
     * Определить полиморфную связь.
     *
     * @return MorphTo
     */
    public function likeable(): MorphTo
    {
        return $this->morphTo();
    }
}
