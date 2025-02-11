'use client';

import { useToastLoader } from '@/context/useToastLoader';
import { Check, ChevronDown, FileImage, Loader2, X } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

export function ToastLoader() {
    const { items, collapse, handleCollapse, handleSetHidden, hidden } =
        useToastLoader();

    if (!items || items.length == 0) return;
    if (hidden) return;
    return (
        <div className="fixed right-4 bottom-4 transition rounded w-72 bg-sidebar grid place-items-center">
            <div className="flex flex-col w-72">
                <div className="flex items-center justify-between px-4 py-2">
                    <h1>Uploads</h1>
                    <div className="flex items-center gap-2">
                        <div
                            className="p-1 hover:bg-secondary"
                            onClick={() => handleCollapse()}
                        >
                            <ChevronDown
                                className={cn(
                                    'w-4 h-4',
                                    collapse ? 'rotate-180' : 'rotate-0'
                                )}
                            />
                        </div>

                        <div
                            className="p-1 hover:bg-secondary"
                            onClick={() => handleSetHidden(true)}
                        >
                            <X className={cn('w-4 h-4')} />
                        </div>
                    </div>
                </div>
                {!collapse && (
                    <ScrollArea className="h-40 p-2 w-full">
                        {items.map((item) => (
                            <div className="p-2 w-full flex justify-between items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <FileImage className="w-4 h-4" />
                                    <p className="gap-4 flex items-center flex-row truncate overflow-hidden text-ellipsis whitespace-nowrap">
                                        {item.displayName}
                                    </p>
                                </div>
                                <div>
                                    {item.isFinished && (
                                        <div className="rounded-full w-5 h-5 p-0.5 bg-green-700 grid place-items-center">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    )}
                                    {!item.isFinished && (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                )}
            </div>
        </div>
    );
}
