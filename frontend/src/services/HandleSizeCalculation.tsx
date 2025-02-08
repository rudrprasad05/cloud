import { Minus } from 'lucide-react';
import React from 'react';

export default function HandleSizeCalculation({ size }: { size?: number }) {
    if (!size) return <Minus className="ml-auto h-4" />;

    if (size / Math.pow(2, 10) < 1) {
        return <span>{size} b</span>;
    }
    if (size / Math.pow(2, 20) < 1) {
        return <span>{Math.ceil(size / Math.pow(2, 10))} Kb</span>;
    }
    if (size / Math.pow(2, 30) < 1) {
        return <span>{Math.ceil(size / Math.pow(2, 20))} Mb</span>;
    }
    if (size / Math.pow(2, 40) < 1) {
        return <span>{Math.ceil(size / Math.pow(2, 30))} B</span>;
    }
}
