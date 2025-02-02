import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Navbar from '@/components/global/Navbar';
import { ThemeProvider } from '@/theme/ThemeProvider';
import '../globals.css';
import { SessionProvider } from '@/context/useSession';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
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
                <SessionProvider>
                    <ThemeProvider attribute="class" defaultTheme="dark">
                        <SidebarProvider>
                            <Navbar />
                            <Toaster />
                            <main className="grow w-full">
                                <SidebarTrigger />
                                {children}
                            </main>
                        </SidebarProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
