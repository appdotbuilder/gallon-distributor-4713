<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProcessGallonTransactionRequest;
use App\Models\Employee;
use App\Models\GallonTransaction;
use App\Services\ExcelExportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GallonTransactionController extends Controller
{
    /**
     * Process gallon transaction.
     */
    public function store(ProcessGallonTransactionRequest $request)
    {
        $employee = Employee::findOrFail($request->employee_id);
        
        // Check if quota reset is needed
        if ($employee->needsQuotaReset()) {
            $employee->resetMonthlyQuota();
            $employee->refresh();
        }

        $gallonsRequested = $request->gallons_taken;

        if (!$employee->canTakeGallons($gallonsRequested)) {
            return Inertia::render('welcome', [
                'employee' => $employee->load('transactions'),
                'message' => "Insufficient quota. You only have {$employee->remaining_quota} gallons remaining.",
                'messageType' => 'error'
            ]);
        }

        // Process transaction
        $employee->used_quota += $gallonsRequested;
        $employee->save();

        // Create transaction record
        GallonTransaction::create([
            'employee_id' => $employee->id,
            'gallons_taken' => $gallonsRequested,
            'remaining_quota' => $employee->remaining_quota,
            'transaction_date' => now(),
        ]);

        $employee->refresh();

        return Inertia::render('welcome', [
            'employee' => $employee->load('transactions'),
            'message' => "Transaction successful! You took {$gallonsRequested} gallons. Remaining quota: {$employee->remaining_quota} gallons.",
            'messageType' => 'success'
        ]);
    }


}