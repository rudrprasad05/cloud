'use client';

import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function page() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        router.prefetch('/cloud/my-cloud');
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        const redirectTimer = setTimeout(() => {
            router.push('/cloud/my-cloud');
        }, 3000);
        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [router]);
    return (
        <div className="text-center w-screen h-screen grid place-items-center">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Error 403 Unauthorised</h1>
                <h2 className="text-xl text-secondary-foreground/70">
                    The resource youre trying to get is no longer available or
                    has been moved
                </h2>
                <p className="text-sm text-secondary-foreground/70">
                    Redirecting in {countdown} second{countdown <= 1 ? '' : 's'}
                </p>
            </div>
        </div>
    );
}
