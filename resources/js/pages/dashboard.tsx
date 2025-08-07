import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileSpreadsheet, BarChart3, Settings, Plus, Eye } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppShell>
            <div className="container mx-auto p-6 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">🛡️ Admin Dashboard</h1>
                    <p className="text-gray-600">Manage employees and monitor gallon distribution</p>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card className="border-blue-200 bg-blue-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-900">
                                Employee Management
                            </CardTitle>
                            <Users className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                                    <Link href="/employees">
                                        <Eye className="h-4 w-4" />
                                        View All Employees
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="sm" className="w-full border-blue-600 text-blue-600">
                                    <Link href="/employees/create">
                                        <Plus className="h-4 w-4" />
                                        Add Employee
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-900">
                                Transaction History
                            </CardTitle>
                            <BarChart3 className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700">
                                    <Link href="/admin/transactions">
                                        <Eye className="h-4 w-4" />
                                        View Transactions
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="sm" className="w-full border-green-600 text-green-600">
                                    <Link href="/admin/transactions/export">
                                        <FileSpreadsheet className="h-4 w-4" />
                                        Download Report
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-200 bg-purple-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-900">
                                Quick Access
                            </CardTitle>
                            <Settings className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Button asChild size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                                    <Link href="/">
                                        <Eye className="h-4 w-4" />
                                        Scan Interface
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="sm" className="w-full border-purple-600 text-purple-600">
                                    <Link href="/settings/profile">
                                        <Settings className="h-4 w-4" />
                                        Profile Settings
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-orange-200 bg-orange-50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-900">
                                System Status
                            </CardTitle>
                            <BarChart3 className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-900 mb-1">🟢 Online</div>
                                <p className="text-sm text-orange-700">All systems operational</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Areas */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Employee Management
                            </CardTitle>
                            <CardDescription>
                                Add, edit, and manage employee data and gallon quotas
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">👥 View All Employees</span>
                                    <Button asChild size="sm" variant="outline">
                                        <Link href="/employees">Browse</Link>
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">➕ Add New Employee</span>
                                    <Button asChild size="sm" variant="outline">
                                        <Link href="/employees/create">Create</Link>
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">📝 Manage Employee Data</span>
                                    <Button asChild size="sm" variant="outline">
                                        <Link href="/employees">Manage</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                                Reports & Analytics
                            </CardTitle>
                            <CardDescription>
                                Monitor gallon distribution and download transaction reports
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">📊 Transaction History</span>
                                    <Button asChild size="sm" variant="outline">
                                        <Link href="/admin/transactions">View</Link>
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">💾 Export to Excel</span>
                                    <Button asChild size="sm" variant="outline">
                                        <Link href="/admin/transactions/export">Download</Link>
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">🔄 Real-time Monitoring</span>
                                    <Button asChild size="sm" variant="outline">
                                        <Link href="/admin/transactions">Monitor</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Instructions */}
                <Card className="mt-8 bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold text-blue-900 mb-3">🎯 Admin Functions</h3>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div>
                                <h4 className="font-medium text-blue-800 mb-2">👥 Employee Management</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Add new employees with ID, name, and department</li>
                                    <li>• Edit employee information and quota settings</li>
                                    <li>• Delete employees (with transaction history)</li>
                                    <li>• Monitor individual quota usage</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-blue-800 mb-2">📊 Reports & Monitoring</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• View all gallon transactions in real-time</li>
                                    <li>• Export complete transaction history to CSV</li>
                                    <li>• Track quota usage across departments</li>
                                    <li>• Monitor system performance and usage</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}