<?php

use App\Models\Employee;
use App\Models\GallonTransaction;

test('can search employee by id', function () {
    $employee = Employee::factory()->create([
        'employee_id' => 'TEST001'
    ]);

    $this->post('/', [
        'employee_id' => 'TEST001'
    ])
    ->assertStatus(200)
    ->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->has('employee')
            ->where('employee.employee_id', 'TEST001')
    );
});

test('employee not found shows error', function () {
    $this->post('/', [
        'employee_id' => 'NONEXISTENT'
    ])
    ->assertStatus(200)
    ->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->where('employee', null)
            ->where('messageType', 'error')
    );
});

test('can process gallon transaction', function () {
    $employee = Employee::factory()->create([
        'current_quota' => 10,
        'used_quota' => 3,
    ]);

    $this->post('/transaction', [
        'employee_id' => $employee->id,
        'gallons_taken' => 2,
    ])
    ->assertStatus(200);
    
    $employee->refresh();
    expect($employee->used_quota)->toBe(5);
    
    $this->assertDatabaseHas('gallon_transactions', [
        'employee_id' => $employee->id,
        'gallons_taken' => 2,
    ]);
});

test('cannot exceed quota', function () {
    $employee = Employee::factory()->create([
        'current_quota' => 10,
        'used_quota' => 9, // Only 1 gallon remaining
    ]);

    $this->post('/transaction', [
        'employee_id' => $employee->id,
        'gallons_taken' => 2, // Trying to take 2 gallons
    ])
    ->assertStatus(200)
    ->assertInertia(fn ($page) => 
        $page->component('welcome')
            ->where('messageType', 'error')
    );

    // Quota should remain unchanged
    $employee->refresh();
    expect($employee->used_quota)->toBe(9);
});

test('quota resets automatically', function () {
    $employee = Employee::factory()->create([
        'used_quota' => 10,
        'quota_reset_date' => now()->subMonth(), // Last month
    ]);

    // Search for employee (should trigger quota reset)
    $this->post('/', [
        'employee_id' => $employee->employee_id
    ]);

    $employee->refresh();
    expect($employee->used_quota)->toBe(0);
    expect($employee->current_quota)->toBe(10);
    expect($employee->quota_reset_date->isSameMonth(now()))->toBeTrue();
});