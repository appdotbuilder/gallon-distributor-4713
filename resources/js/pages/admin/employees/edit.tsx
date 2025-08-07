import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, ArrowLeft, User } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    current_quota: number;
    used_quota: number;
}

interface Props {
    employee: Employee;
    errors?: {
        employee_id?: string;
        name?: string;
        department?: string;
        current_quota?: string;
        used_quota?: string;
    };
    [key: string]: unknown;
}

export default function EditEmployee({ employee, errors = {} }: Props) {
    const [data, setData] = useState({
        employee_id: employee.employee_id,
        name: employee.name,
        department: employee.department,
        current_quota: employee.current_quota,
        used_quota: employee.used_quota,
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        router.patch(`/employees/${employee.id}`, data, {
            onFinish: () => setIsProcessing(false),
        });
    };

    return (
        <AppShell>
            <div className="container mx-auto p-6 max-w-2xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/employees">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Employees
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">✏️ Edit Employee</h1>
                        <p className="text-gray-600">Update {employee.name}'s information</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            Employee Information
                        </CardTitle>
                        <CardDescription>
                            Update employee details and quota settings
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="employee_id">
                                        Employee ID <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="employee_id"
                                        type="text"
                                        value={data.employee_id}
                                        onChange={(e) => setData({ ...data, employee_id: e.target.value })}
                                        placeholder="e.g., EMP001, BARCODE123"
                                        className={errors.employee_id ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.employee_id && (
                                        <p className="text-sm text-red-600">{errors.employee_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Full Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        placeholder="Employee full name"
                                        className={errors.name ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="department">
                                    Department <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="department"
                                    type="text"
                                    value={data.department}
                                    onChange={(e) => setData({ ...data, department: e.target.value })}
                                    placeholder="e.g., IT, HR, Operations"
                                    className={errors.department ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.department && (
                                    <p className="text-sm text-red-600">{errors.department}</p>
                                )}
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="current_quota">
                                        Monthly Quota (Gallons) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="current_quota"
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={data.current_quota}
                                        onChange={(e) => setData({ ...data, current_quota: parseInt(e.target.value) || 0 })}
                                        className={errors.current_quota ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.current_quota && (
                                        <p className="text-sm text-red-600">{errors.current_quota}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="used_quota">
                                        Used This Month <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="used_quota"
                                        type="number"
                                        min="0"
                                        value={data.used_quota}
                                        onChange={(e) => setData({ ...data, used_quota: parseInt(e.target.value) || 0 })}
                                        className={errors.used_quota ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.used_quota && (
                                        <p className="text-sm text-red-600">{errors.used_quota}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        Remaining: {data.current_quota - data.used_quota} gallons
                                    </p>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <div className="flex justify-end gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href="/employees">Cancel</Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {isProcessing ? (
                                            'Updating...'
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4 mr-2" />
                                                Update Employee
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Quota Reset Warning */}
                <Card className="mt-6 bg-orange-50 border-orange-200">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold text-orange-900 mb-3">⚠️ Quota Management</h3>
                        <div className="text-sm text-orange-800 space-y-2">
                            <p><strong>Current Status:</strong> {employee.current_quota - employee.used_quota} gallons remaining this month</p>
                            <p><strong>Auto Reset:</strong> Quota will automatically reset to {data.current_quota} gallons next month</p>
                            <p><strong>Manual Adjustment:</strong> You can manually adjust the used quota to correct any discrepancies</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}