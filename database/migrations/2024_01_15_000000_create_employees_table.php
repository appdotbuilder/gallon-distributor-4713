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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique()->comment('Employee ID from barcode/card');
            $table->string('name')->comment('Employee full name');
            $table->string('department')->comment('Employee department');
            $table->integer('current_quota')->default(10)->comment('Current month gallon quota');
            $table->integer('used_quota')->default(0)->comment('Used quota this month');
            $table->date('quota_reset_date')->comment('Date when quota was last reset');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('department');
            $table->index(['employee_id', 'quota_reset_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};