<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Class User
 *
 * @property string $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 *
 * @property-read Video[]|HasMany $videos
 * @property-read Question[]|HasMany $questions
 */
class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable;

    public function canAccessPanel(Panel $panel): bool
    {
        return true;
        //return str_ends_with($this->email, '@yourdomain.com') && $this->hasVerifiedEmail();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Связь пользователя с видео (один ко многим)
     *
     * @return HasMany
     */
    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }

    /**
     * Связь пользователя с вопросами (один ко многим)
     *
     * @return HasMany
     */
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}
