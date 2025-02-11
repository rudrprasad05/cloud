'use client';

import { useSelectedItem } from '@/context/useSelected';
import {
    ClipboardPaste,
    Download,
    Link,
    Move,
    Trash,
    UserPlus,
    X,
} from 'lucide-react';
import React from 'react';

export default function SelectBox() {
    const { selectedItem, addSelectedItem } = useSelectedItem();

    return (
        <div className="w-full h-10 rounded-lg text-sm bg-secondary flex gap-6 px-2">
            <div className="flex items-center gap-2">
                <div
                    className="cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40"
                    onClick={() => addSelectedItem(undefined)}
                >
                    <X className="h-4 w-4" />
                </div>
                Selected
            </div>
            <div className="flex gap-2 items-center">
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <UserPlus className="h-4 w-4" />
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <Download className="h-4 w-4" />
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <ClipboardPaste className="h-4 w-4" />
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <Trash className="h-4 w-4" />
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <Link className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
