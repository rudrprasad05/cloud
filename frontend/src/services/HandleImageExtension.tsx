import { Minus } from 'lucide-react';
import React from 'react';

export default function HandleImageExtension({ name }: { name?: string }) {
    if (!name) return <Minus className="w-5 h-5" />;
    let ext = name.split('.')[name.split('.').length - 1];
    return <span>.{ext}</span>;
}
