<?php

namespace App\Services;

use App\Models\GallonTransaction;
use Illuminate\Http\Response;

class ExcelExportService
{
    /**
     * Export gallon transactions to CSV format.
     *
     * @return \Illuminate\Http\Response
     */
    public function exportTransactions(): Response
    {
        $transactions = GallonTransaction::with('employee')
            ->orderBy('transaction_date', 'desc')
            ->get();

        $csvData = "Transaction Date,Employee ID,Employee Name,Department,Gallons Taken,Remaining Quota\n";
        
        foreach ($transactions as $transaction) {
            $csvData .= sprintf(
                "%s,%s,%s,%s,%s,%s\n",
                $transaction->transaction_date->format('Y-m-d H:i:s'),
                $transaction->employee->employee_id,
                '"' . str_replace('"', '""', $transaction->employee->name) . '"',
                '"' . str_replace('"', '""', $transaction->employee->department) . '"',
                $transaction->gallons_taken,
                $transaction->remaining_quota
            );
        }

        return response($csvData, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="gallon-transactions-' . now()->format('Y-m-d') . '.csv"',
        ]);
    }
}