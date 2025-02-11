'use client';

import React, { ReactNode, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Media } from '@/types';
import { FileImage } from 'lucide-react';
import Image from 'next/image';

export default function ImageModal({
    children,
    media,
    className,
}: {
    children: ReactNode;
    media: Partial<Media>;
    className: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                onDoubleClick={() => setIsOpen(true)}
                onClick={() => {}}
                className={className}
            >
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-screen h-screen border-none w-full bg-white-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100">
                <DialogHeader className="flex flex-row gap-8 w-screen">
                    <DialogTitle className="text-2xl gap-4 flex items-center flex-row truncate  w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        <FileImage className="w-8 h-8" />
                        {media.name}
                    </DialogTitle>
                    <div>Settings</div>
                </DialogHeader>
                <div className="grid place-items-center py-20">
                    <Image
                        src={media.source as string}
                        alt=""
                        height={500}
                        width={500}
                        className=" h-full object-contain"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,..."
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
