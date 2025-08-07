<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departments = ['IT', 'HR', 'Operations', 'Finance', 'Marketing', 'Sales', 'Production', 'Quality Assurance'];
        $currentQuota = 10;
        $usedQuota = fake()->numberBetween(0, $currentQuota);

        return [
            'employee_id' => 'EMP' . fake()->unique()->numerify('####'),
            'name' => fake()->name(),
            'department' => fake()->randomElement($departments),
            'current_quota' => $currentQuota,
            'used_quota' => $usedQuota,
            'quota_reset_date' => now()->startOfMonth(),
        ];
    }

    /**
     * Indicate that the employee has used their full quota.
     */
    public function fullQuotaUsed(): static
    {
        return $this->state(fn (array $attributes) => [
            'used_quota' => $attributes['current_quota'],
        ]);
    }

    /**
     * Indicate that the employee hasn't used any quota.
     */
    public function noQuotaUsed(): static
    {
        return $this->state(fn (array $attributes) => [
            'used_quota' => 0,
        ]);
    }
}