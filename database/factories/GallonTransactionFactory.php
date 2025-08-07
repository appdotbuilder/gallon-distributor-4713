<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GallonTransaction>
 */
class GallonTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gallonsTaken = fake()->numberBetween(1, 5);
        $remainingQuota = fake()->numberBetween(0, 9);

        return [
            'employee_id' => Employee::factory(),
            'gallons_taken' => $gallonsTaken,
            'remaining_quota' => $remainingQuota,
            'transaction_date' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Create a transaction for a specific employee.
     */
    public function forEmployee(Employee $employee): static
    {
        return $this->state(fn (array $attributes) => [
            'employee_id' => $employee->id,
        ]);
    }
}