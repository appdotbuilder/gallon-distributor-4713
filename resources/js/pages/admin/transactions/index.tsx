import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ArrowLeft, Calendar, User, Building, Droplets } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Transaction {
    id: number;
    gallons_taken: number;
    remaining_quota: number;
    transaction_date: string;
    employee: {
        id: number;
        employee_id: string;
        name: string;
        department: string;
    };
}

interface Props {
    transactions: {
        data: Transaction[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function TransactionIndex({ transactions }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const totalGallons = transactions.data.reduce((sum, transaction) => sum + transaction.gallons_taken, 0);

    return (
        <AppShell>
            <div className="container mx-auto p-6 max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/dashboard">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Dashboard
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Transaction History</h1>
                            <p className="text-gray-600">Monitor all gallon distribution transactions</p>
                        </div>
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                        <Link href="/admin/transactions/export">
                            <Download className="h-4 w-4" />
                            Export to CSV
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{transactions.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Gallons</CardTitle>
                            <Droplets className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalGallons}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unique Employees</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Set(transactions.data.map(t => t.employee.id)).size}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Per Transaction</CardTitle>
                            <Droplets className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {transactions.total > 0 ? (totalGallons / transactions.total).toFixed(1) : '0.0'}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transaction List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>
                            All gallon distribution transactions ordered by most recent
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions.data.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Droplets className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {transaction.employee.name}
                                                </h3>
                                                <Badge variant="outline" className="text-xs">
                                                    {transaction.employee.employee_id}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Building className="h-4 w-4" />
                                                    {transaction.employee.department}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(transaction.transaction_date)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-blue-600">
                                                {transaction.gallons_taken} gallons
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {transaction.remaining_quota} remaining
                                            </div>
                                        </div>
                                        <Badge 
                                            variant={transaction.remaining_quota > 0 ? "default" : "destructive"}
                                            className={transaction.remaining_quota > 0 ? "bg-green-100 text-green-800" : ""}
                                        >
                                            {transaction.remaining_quota > 0 ? 'Active' : 'Quota Full'}
                                        </Badge>
                                    </div>
                                </div>
                            ))}

                            {transactions.data.length === 0 && (
                                <div className="text-center py-12">
                                    <Droplets className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">No transactions found</h3>
                                    <p className="text-gray-500 mb-6">
                                        No gallon distribution transactions have been recorded yet.
                                    </p>
                                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                        <Link href="/">
                                            Go to Scan Interface
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination would go here if needed */}
                {transactions.last_page > 1 && (
                    <div className="mt-6 flex justify-center">
                        <div className="text-sm text-gray-500">
                            Showing {(transactions.current_page - 1) * transactions.per_page + 1} to{' '}
                            {Math.min(transactions.current_page * transactions.per_page, transactions.total)} of{' '}
                            {transactions.total} transactions
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}