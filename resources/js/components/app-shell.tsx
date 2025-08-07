import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Droplets, Shield, LogIn } from 'lucide-react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar' | 'simple';
}

export function AppShell({ children, variant = 'simple' }: AppShellProps) {
    const { auth, sidebarOpen } = usePage<SharedData>().props;

    if (variant === 'simple') {
        return (
            <div className="min-h-screen bg-white">
                {/* Simple Header */}
                <header className="bg-white border-b border-gray-200">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex justify-between items-center">
                            <Link href="/" className="flex items-center gap-3">
                                <Droplets className="h-8 w-8 text-blue-600" />
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">PT Tirta Investama</h1>
                                    <p className="text-sm text-gray-600">Gallon Distribution System</p>
                                </div>
                            </Link>
                            
                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <>
                                        <span className="text-sm text-gray-600">
                                            Welcome, {auth.user.name}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                        >
                                            <Link href="/dashboard">
                                                <Shield className="h-4 w-4" />
                                                Admin Panel
                                            </Link>
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                    >
                                        <Link href="/login">
                                            <LogIn className="h-4 w-4" />
                                            Admin Login
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main>
                    {children}
                </main>
            </div>
        );
    }

    if (variant === 'header') {
        return <div className="flex min-h-screen w-full flex-col">{children}</div>;
    }

    return <SidebarProvider defaultOpen={sidebarOpen}>{children}</SidebarProvider>;
}