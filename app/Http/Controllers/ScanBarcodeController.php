<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProcessGallonTransactionRequest;
use App\Http\Requests\SearchEmployeeRequest;
use App\Models\Employee;
use App\Models\GallonTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScanBarcodeController extends Controller
{
    /**
     * Display the barcode scanning interface.
     */
    public function index()
    {
        return Inertia::render('welcome', [
            'employee' => null,
            'message' => null,
            'messageType' => null
        ]);
    }

    /**
     * Search for employee by ID or barcode.
     */
    public function store(SearchEmployeeRequest $request)
    {
        $employee = Employee::where('employee_id', $request->employee_id)->first();
        
        if (!$employee) {
            return Inertia::render('welcome', [
                'employee' => null,
                'message' => 'Employee not found. Please check the ID and try again.',
                'messageType' => 'error'
            ]);
        }

        // Check if quota reset is needed
        if ($employee->needsQuotaReset()) {
            $employee->resetMonthlyQuota();
            $employee->refresh();
        }

        return Inertia::render('welcome', [
            'employee' => $employee->load('transactions'),
            'message' => null,
            'messageType' => null
        ]);
    }
}