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
        Schema::create('questions', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->text('question'); // Вопрос
            $table->decimal('percentage', 5, 2)->default(0); // Процент попадания вопроса
            $table->integer('ease')->default(0); // Сложность вопроса

            $table->foreignUuid('profession_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignUuid('level_id')->nullable()->constrained()->onDelete('set null');

            $table->timestamps();

            $table->index('question');
            $table->index('profession_id');
            $table->index('level_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
