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
        Schema::create('answers', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->text('answer'); // Текст ответа
            $table->string('source')->nullable(); // Источник ответа

            $table->foreignUuid('question_id')->constrained()->onDelete('cascade');

            $table->timestamps();

            $table->index('question_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answers');
    }
};
