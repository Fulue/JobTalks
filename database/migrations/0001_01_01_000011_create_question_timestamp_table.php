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
        Schema::create('question_timestamp', function (Blueprint $table) {
            $table->id();

            $table->foreignUuid('timestamp_id')->nullable()->constrained()->onDelete('cascade'); // Внешний ключ на timestamps
            $table->foreignUuid('question_id')->nullable()->constrained()->onDelete('cascade'); // Внешний ключ на questions
            $table->float('similarity', 2)->nullable();

            $table->index('timestamp_id');
            $table->index('question_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_timestamp');
    }
};
