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
        Schema::create('views', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->ipAddress();
            $table->uuidMorphs('viewable');

            $table->timestamps();

            $table->index('viewable_id');
            $table->index('viewable_type');
            $table->index('ip_address');
            $table->unique(['viewable_id', 'viewable_type', 'ip_address']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('views');
    }
};
