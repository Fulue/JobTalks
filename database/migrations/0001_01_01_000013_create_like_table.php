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
        Schema::create('likes', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->ipAddress()->nullable(); // Ip адрес
            $table->enum('reaction_type', ['like', 'dislike']); // Тип реакции

            $table->uuidMorphs('likeable');

            $table->timestamps();

            $table->index('likeable_id');
            $table->index('likeable_type');
            $table->index('ip_address');
            $table->unique(['likeable_id', 'likeable_type', 'ip_address']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};
