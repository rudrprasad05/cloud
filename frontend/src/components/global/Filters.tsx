'use client';

import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function Filters() {
    return (
        <div className="w-full h-10 rounded-lg grid grid-cols-4 items-center gap-6">
            <div className="flex items-center justify-between border-tpt-4">
                <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mpaisa">mpaisa</SelectItem>
                            <SelectItem value="bsp">BSP</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Shared" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mpaisa">mpaisa</SelectItem>
                            <SelectItem value="bsp">BSP</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
