import React, { useState, useEffect, useCallback } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { User, Building, CreditCard, Droplets, CheckCircle, XCircle } from 'lucide-react';

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
    employee?: Employee;
    message?: string;
    messageType?: 'success' | 'error';
    [key: string]: unknown;
}

export default function ScanBarcode({ employee, message, messageType }: Props) {
    const [employeeId, setEmployeeId] = useState('');
    const [gallonCount, setGallonCount] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);


    // Clear form when there's no employee
    useEffect(() => {
        if (!employee) {
            setEmployeeId('');
        }
    }, [employee]);

    const handleSearch = useCallback(() => {
        if (!employeeId.trim()) return;

        setIsProcessing(true);
        router.post('/', { employee_id: employeeId.trim() }, {
            preserveState: false,
            onFinish: () => setIsProcessing(false)
        });
    }, [employeeId]);

    // Arduino barcode scanner integration
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Arduino typically sends barcode data ending with Enter/Return
            if (event.key === 'Enter' && employeeId && !employee) {
                event.preventDefault();
                handleSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [employeeId, employee, handleSearch]);

    const handleTransaction = () => {
        if (!employee || gallonCount < 1) return;

        setIsProcessing(true);
        router.post('/transaction', {
            employee_id: employee.id,
            gallons_taken: gallonCount
        }, {
            preserveState: false,
            onFinish: () => setIsProcessing(false)
        });
    };

    const handleReset = () => {
        setEmployeeId('');
        setGallonCount(1);
        router.get('/', {}, {
            preserveState: false
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-6 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Droplets className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">PT Tirta Investama</h1>
                    </div>
                    <p className="text-xl text-gray-600">💧 Gallon Distribution System</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Scan your employee barcode or enter your ID to manage gallon distribution
                    </p>
                </div>

                {/* Alert Messages */}
                {message && (
                    <Alert className={`mb-6 ${messageType === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                        {messageType === 'success' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <AlertDescription className={messageType === 'success' ? 'text-green-800' : 'text-red-800'}>
                            {message}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left Column - Employee Search */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-blue-600" />
                                Employee Identification
                            </CardTitle>
                            <CardDescription>
                                Scan your employee barcode or enter your employee ID manually
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="employee_id">Employee ID</Label>
                                <Input
                                    id="employee_id"
                                    placeholder="Scan barcode or type employee ID"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    className="text-lg"
                                    disabled={!!employee}
                                    autoFocus
                                />
                            </div>
                            
                            <div className="flex gap-2">
                                <Button 
                                    onClick={handleSearch}
                                    disabled={!employeeId.trim() || isProcessing || !!employee}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    {isProcessing ? 'Searching...' : 'Search Employee'}
                                </Button>
                                
                                {employee && (
                                    <Button 
                                        onClick={handleReset}
                                        variant="outline"
                                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                    >
                                        New Search
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Column - Employee Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Employee Information
                            </CardTitle>
                            <CardDescription>
                                Employee details and gallon quota status
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {employee ? (
                                <div className="space-y-4">
                                    <div className="grid gap-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Employee ID:</span>
                                            <span className="font-medium">{employee.employee_id}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Name:</span>
                                            <span className="font-medium">{employee.name}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Department:</span>
                                            <div className="flex items-center gap-2">
                                                <Building className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium">{employee.department}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-500">Monthly Quota:</span>
                                            <span className="font-medium">{employee.current_quota} gallons</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-500">Used This Month:</span>
                                            <span className="font-medium">{employee.used_quota} gallons</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">Remaining:</span>
                                            <Badge 
                                                variant={employee.remaining_quota > 0 ? "default" : "destructive"}
                                                className={employee.remaining_quota > 0 ? "bg-green-100 text-green-800" : ""}
                                            >
                                                {employee.remaining_quota} gallons
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">Enter employee ID to view information</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Transaction Section */}
                {employee && employee.remaining_quota > 0 && (
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Droplets className="h-5 w-5 text-blue-600" />
                                Gallon Transaction
                            </CardTitle>
                            <CardDescription>
                                Enter the number of gallons you want to take
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="gallon_count">Number of Gallons</Label>
                                    <Input
                                        id="gallon_count"
                                        type="number"
                                        min="1"
                                        max={Math.min(employee.remaining_quota, 10)}
                                        value={gallonCount}
                                        onChange={(e) => setGallonCount(parseInt(e.target.value) || 1)}
                                        className="text-lg text-center"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <Button 
                                        onClick={handleTransaction}
                                        disabled={isProcessing || gallonCount < 1 || gallonCount > employee.remaining_quota}
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                        size="lg"
                                    >
                                        {isProcessing ? 'Processing...' : `Take ${gallonCount} Gallon${gallonCount > 1 ? 's' : ''}`}
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="text-xs text-gray-500 text-center">
                                Maximum {Math.min(employee.remaining_quota, 10)} gallons per transaction
                            </div>
                        </CardContent>
                    </Card>
                )}
                
                {/* No Quota Warning */}
                {employee && employee.remaining_quota === 0 && (
                    <Card className="mt-6 border-orange-200 bg-orange-50">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <XCircle className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                                <h3 className="text-lg font-medium text-orange-900 mb-2">Quota Exhausted</h3>
                                <p className="text-orange-700">
                                    You have used all {employee.current_quota} gallons for this month. 
                                    Your quota will reset next month.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Instructions */}
                <Card className="mt-6 bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                        <h3 className="font-semibold text-blue-900 mb-3">📖 How to Use</h3>
                        <div className="grid gap-2 text-sm text-blue-800">
                            <p>🔍 <strong>Arduino Scanner:</strong> Simply scan your employee barcode - the system will automatically search</p>
                            <p>⌨️ <strong>Manual Entry:</strong> Type your employee ID and click "Search Employee"</p>
                            <p>💧 <strong>Take Gallons:</strong> Enter quantity (1-10) and confirm your transaction</p>
                            <p>📊 <strong>Monthly Quota:</strong> Each employee gets 10 gallons per month, resets automatically</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}