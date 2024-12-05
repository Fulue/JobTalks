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

        Schema::create('taggables', function (Blueprint $table) {
            $table->id();

            $table->foreignUuid('tag_id')->constrained()->onDelete('cascade'); // Внешний ключ на tags
            $table->string('taggable_type'); // Тип модели (Question, Timestamp)
            $table->foreignUuid('taggable_id'); // Идентификатор связанной модели

            $table->index('tag_id');
            $table->index(['taggable_type', 'taggable_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taggables');
    }
};
