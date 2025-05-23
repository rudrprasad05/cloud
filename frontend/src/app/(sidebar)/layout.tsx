import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Navbar from '@/components/global/Navbar';
import { ThemeProvider } from '@/theme/ThemeProvider';
import '../globals.css';

import { SessionProvider } from '@/context/useSession';
import { Toaster } from '@/components/ui/sonner';
import SearchBox from '@/components/global/SearchBox';
import { ToastLoaderProvider } from '@/context/useToastLoader';
import { ToastLoader } from '@/components/global/ToastLoader';
import { SelectedItemProvider } from '@/context/useSelected';
import { Suspense } from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Cloud',
    description: 'Cloud storage of the future',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Suspense fallback={<>Loading...</>}>
                    <SessionProvider>
                        <ToastLoaderProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="dark"
                            >
                                <SelectedItemProvider>
                                    <SidebarProvider>
                                        <Navbar />
                                        <Toaster />
                                        <main className="relative grow w-full flex flex-col gap-2 p-8">
                                            <SearchBox />
                                            <div className="py-4 grow flex flex-col w-full">
                                                {children}
                                            </div>
                                            <ToastLoader />
                                        </main>
                                    </SidebarProvider>
                                </SelectedItemProvider>
                            </ThemeProvider>
                        </ToastLoaderProvider>
                    </SessionProvider>
                </Suspense>
            </body>
        </html>
    );
}
