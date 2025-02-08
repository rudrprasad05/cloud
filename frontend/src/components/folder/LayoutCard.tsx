import React from 'react';

export default function LayoutCard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="rounded transition group hover:bg-secondary grid grid-cols-12 items-center flex-1 min-w-0">
            {children}
        </div>
    );
}
