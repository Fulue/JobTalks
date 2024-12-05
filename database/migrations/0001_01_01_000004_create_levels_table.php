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
        Schema::create('levels', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('level'); // Уровень
            $table->string('icon'); // Иконка уровня

            $table->foreignUuid('profession_id')->constrained()->onDelete('cascade');

            $table->timestamps();

            $table->index('profession_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('levels');
    }
};
