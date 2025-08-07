import React from 'react';
import { AppShell } from '@/components/app-shell';
import ScanBarcode from '@/pages/scan-barcode';

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

export default function Welcome({ employee, message, messageType }: Props) {
    return (
        <AppShell>
            <ScanBarcode 
                employee={employee}
                message={message}
                messageType={messageType}
            />
        </AppShell>
    );
}