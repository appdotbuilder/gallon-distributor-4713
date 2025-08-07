<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GallonTransaction;
use App\Services\ExcelExportService;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display admin dashboard.
     */
    public function index()
    {
        return Inertia::render('dashboard');
    }

    /**
     * Display all transactions for admin.
     */
    public function show()
    {
        $transactions = GallonTransaction::with('employee')
            ->orderBy('transaction_date', 'desc')
            ->paginate(20);

        return Inertia::render('admin/transactions/index', [
            'transactions' => $transactions
        ]);
    }

    /**
     * Export all transactions to CSV.
     */
    public function store(ExcelExportService $exportService)
    {
        return $exportService->exportTransactions();
    }
}