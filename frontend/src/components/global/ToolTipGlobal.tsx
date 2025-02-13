import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

import React from 'react';

export default function ToolTipGlobal({
    children,
    text,
}: {
    children: React.ReactNode;
    text: string;
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent className="bg-secondary">
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
