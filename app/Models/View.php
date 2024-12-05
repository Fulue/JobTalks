<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * Class View
 *
 * @property string $id
 * @property string $viewable_id
 * @property string $viewable_type
 * @property string $ip_address
 * @property-read Model|MorphTo $viewable
 */
class View extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['viewable_id', 'viewable_type', 'ip_address'];

    /**
     * Определить полиморфную связь.
     *
     * @return MorphTo
     */
    public function viewable(): MorphTo
    {
        return $this->morphTo();
    }
}

