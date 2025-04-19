import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'My Cloud',
    description: 'Cloud app of the future',
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
