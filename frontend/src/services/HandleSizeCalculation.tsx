import { Minus } from 'lucide-react';
import React from 'react';

export default function HandleSizeCalculation({ size }: { size?: number }) {
    if (!size) return <Minus className="mr-auto h-4" />;

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

export function HandleSizeConversion({
    size,
    name,
}: {
    size: number;
    name?: 'B' | 'KB' | 'MB' | 'GB';
}) {
    if (!name) return <Minus className="mr-auto h-4" />;

    switch (name) {
        case 'B':
            return <span>{size} b</span>;
        case 'KB':
            return <span>{Math.ceil(size / Math.pow(2, 10))} Kb</span>;
        case 'MB':
            return <span>{Math.ceil(size / Math.pow(2, 20))} Kb</span>;
        case 'GB':
            return <span>{Math.ceil(size / Math.pow(2, 30))} Kb</span>;
    }
}

export function HandleSizeConversionNumber({
    size,
    name,
}: {
    size: number;
    name?: 'B' | 'KB' | 'MB' | 'GB';
}) {
    switch (name) {
        case 'B':
            return size;
        case 'KB':
            return Math.ceil(size / Math.pow(2, 10));
        case 'MB':
            return Math.ceil(size / Math.pow(2, 20));
        case 'GB':
            return Math.ceil(size / Math.pow(2, 30));
    }
}
