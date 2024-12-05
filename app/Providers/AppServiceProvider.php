<?php

namespace App\Providers;

use App\Services\LikeService;
use App\Services\QuestionService;
use App\Services\TagService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(QuestionService::class);
        $this->app->singleton(TagService::class);
        $this->app->singleton(LikeService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
