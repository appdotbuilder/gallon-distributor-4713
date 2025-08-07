import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, User, Building, CreditCard } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    current_quota: number;
    used_quota: number;
    remaining_quota: number;
}

interface Props {
    employees: {
        data: Employee[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function EmployeeIndex({ employees }: Props) {
    const handleDelete = (employee: Employee) => {
        if (confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone.`)) {
            router.delete(`/employees/${employee.id}`, {
                preserveScroll: true
            });
        }
    };

    return (
        <AppShell>
            <div className="container mx-auto p-6 max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">👥 Employee Management</h1>
                        <p className="text-gray-600">Manage employee data and gallon quotas</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/employees/create">
                            <Plus className="h-4 w-4" />
                            Add Employee
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{employees.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active This Month</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {employees.data.filter(emp => emp.used_quota > 0).length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Quota</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {employees.data.reduce((sum, emp) => sum + emp.current_quota, 0)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Used This Month</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {employees.data.reduce((sum, emp) => sum + emp.used_quota, 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Employee List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Employee Directory</CardTitle>
                        <CardDescription>
                            View and manage all employees in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {employees.data.map((employee) => (
                                <div
                                    key={employee.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg font-medium text-gray-900 truncate">
                                                    {employee.name}
                                                </h3>
                                                <Badge variant="outline" className="text-xs">
                                                    <CreditCard className="h-3 w-3 mr-1" />
                                                    {employee.employee_id}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Building className="h-4 w-4" />
                                                    {employee.department}
                                                </div>
                                                <div>
                                                    Quota: {employee.used_quota}/{employee.current_quota} gallons
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Badge 
                                            variant={employee.remaining_quota > 0 ? "default" : "destructive"}
                                            className={employee.remaining_quota > 0 ? "bg-green-100 text-green-800" : ""}
                                        >
                                            {employee.remaining_quota} remaining
                                        </Badge>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={`/employees/${employee.id}`}>
                                                    View
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={`/employees/${employee.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(employee)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {employees.data.length === 0 && (
                                <div className="text-center py-8">
                                    <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                                    <p className="text-gray-500 mb-4">Get started by adding your first employee.</p>
                                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                        <Link href="/employees/create">
                                            <Plus className="h-4 w-4" />
                                            Add First Employee
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}