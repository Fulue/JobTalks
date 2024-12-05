<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('name'); // Название видео
            $table->string('url'); // Ссылка на видео
            $table->enum('status', ['processed', 'pending']); // Статус видео

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('profession_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignUuid('level_id')->nullable()->constrained()->onDelete('set null');

            $table->timestamps();

            $table->index('profession_id');
            $table->index('level_id');
            $table->unique('url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
