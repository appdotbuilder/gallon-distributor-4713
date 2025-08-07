<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GallonTransactionController;
use App\Http\Controllers\ScanBarcodeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - Scan Barcode functionality
Route::controller(ScanBarcodeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::post('/', 'store')->name('scan.employee');
});

// Gallon transaction processing
Route::post('/transaction', [GallonTransactionController::class, 'store'])
    ->name('transaction.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin routes for employee management
    Route::resource('employees', EmployeeController::class);
    
    // Admin controller for dashboard and reports
    Route::get('/admin/transactions', [AdminController::class, 'show'])
        ->name('admin.transactions');
    Route::get('/admin/transactions/export', [AdminController::class, 'store'])
        ->name('admin.transactions.export');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
