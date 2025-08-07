import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, ArrowLeft, User } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

interface Props {
    errors?: {
        employee_id?: string;
        name?: string;
        department?: string;
        current_quota?: string;
    };
    [key: string]: unknown;
}

export default function CreateEmployee({ errors = {} }: Props) {
    const [data, setData] = useState({
        employee_id: '',
        name: '',
        department: '',
        current_quota: 10,
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        router.post('/employees', data, {
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">➕ Add New Employee</h1>
                        <p className="text-gray-600">Create a new employee record for gallon distribution</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            Employee Information
                        </CardTitle>
                        <CardDescription>
                            Enter the employee's details and initial gallon quota
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
                                    <p className="text-xs text-gray-500">
                                        This ID will be used for barcode scanning
                                    </p>
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

                            <div className="grid gap-6 md:grid-cols-2">
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
                                    <p className="text-xs text-gray-500">
                                        Standard quota is 10 gallons per month
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
                                            'Creating...'
                                        ) : (
                                            <>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Create Employee
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Instructions */}
                <Card className="mt-6 bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold text-blue-900 mb-3">💡 Employee Setup Tips</h3>
                        <div className="text-sm text-blue-800 space-y-2">
                            <p><strong>Employee ID:</strong> Use a unique identifier that matches the barcode/card system</p>
                            <p><strong>Monthly Quota:</strong> Standard allocation is 10 gallons, adjust as needed</p>
                            <p><strong>Department:</strong> Used for reporting and organization purposes</p>
                            <p><strong>Auto Reset:</strong> Quotas automatically reset to full amount each month</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}