<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample employees
        $employees = Employee::factory()->count(15)->create();

        // Create some transactions for random employees
        foreach ($employees->random(8) as $employee) {
            $transactionCount = random_int(1, 5);
            
            for ($i = 0; $i < $transactionCount; $i++) {
                GallonTransaction::factory()
                    ->forEmployee($employee)
                    ->create([
                        'transaction_date' => fake()->dateTimeBetween('-30 days', 'now'),
                    ]);
            }
        }

        // Create a demo employee with known credentials
        Employee::create([
            'employee_id' => 'DEMO001',
            'name' => 'John Doe',
            'department' => 'IT',
            'current_quota' => 10,
            'used_quota' => 3,
            'quota_reset_date' => now()->startOfMonth(),
        ]);
    }
}