<?php

use App\Models\Employee;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('can view employee list', function () {
    Employee::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get('/employees')
        ->assertStatus(200);
});

test('can create employee', function () {
    $employeeData = [
        'employee_id' => 'EMP001',
        'name' => 'John Doe',
        'department' => 'IT',
        'current_quota' => 10,
    ];

    $this->actingAs($this->user)
        ->post('/employees', $employeeData)
        ->assertRedirect('/employees');

    $this->assertDatabaseHas('employees', $employeeData);
});

test('can update employee', function () {
    $employee = Employee::factory()->create();
    
    $updateData = [
        'employee_id' => $employee->employee_id,
        'name' => 'Updated Name',
        'department' => 'Updated Department',
        'current_quota' => 15,
        'used_quota' => $employee->used_quota,
    ];

    $this->actingAs($this->user)
        ->patch("/employees/{$employee->id}", $updateData)
        ->assertRedirect('/employees');

    $this->assertDatabaseHas('employees', [
        'id' => $employee->id,
        'name' => 'Updated Name',
        'department' => 'Updated Department',
    ]);
});

test('can delete employee', function () {
    $employee = Employee::factory()->create();

    $this->actingAs($this->user)
        ->delete("/employees/{$employee->id}")
        ->assertRedirect('/employees');

    $this->assertDatabaseMissing('employees', ['id' => $employee->id]);
});

test('employee quota reset works', function () {
    $employee = Employee::factory()->create([
        'used_quota' => 5,
        'quota_reset_date' => now()->subMonth(),
    ]);

    expect($employee->needsQuotaReset())->toBeTrue();

    $employee->resetMonthlyQuota();

    expect($employee->used_quota)->toBe(0);
    expect($employee->current_quota)->toBe(10);
});