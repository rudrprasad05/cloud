import { Toaster } from '@/components/ui/sonner';
import { SelectedItemProvider } from '@/context/useSelected';
import { SessionProvider } from '@/context/useSession';
import { ThemeProvider } from '@/theme/ThemeProvider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
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
    title: 'My Cloud',
    description: 'Cloud app of the future',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Suspense fallback={<>Loading...</>}>
                    <SessionProvider>
                        <SelectedItemProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="dark"
                            >
                                <Toaster />
                                <main className="grow min-h-screen">
                                    {children}
                                </main>
                            </ThemeProvider>
                        </SelectedItemProvider>
                    </SessionProvider>
                </Suspense>
            </body>
        </html>
    );
}
