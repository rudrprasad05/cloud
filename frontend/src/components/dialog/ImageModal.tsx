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
import {
    Download,
    EllipsisVertical,
    FileImage,
    Globe,
    Printer,
    SquareArrowOutUpRight,
    SquareArrowUpRight,
    X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button, buttonVariants } from '../ui/button';
import { HandleMediaDownload } from '@/services/HandleMediaDownload';

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
            <DialogContent
                showTrigger={false}
                className="max-w-screen h-screen border-none w-full bg-white-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 flex flex-col"
            >
                <DialogHeader className="flex flex-row gap-8">
                    <DialogTitle className="text-lg gap-4 flex items-center flex-row truncate  w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        <FileImage className="w-6 h-6" />
                        {media.name}
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                        <Link target="_blank" href={`/files/${media.id}`}>
                            <div className="inline-flex items-center justify-center font-medium p-2 text-sm border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
                                <SquareArrowOutUpRight className="w-4 h-4" />
                            </div>
                        </Link>

                        <Button
                            onClick={() => HandleMediaDownload(media)}
                            className="rounded-full h-10 w-10"
                            variant={'outline'}
                        >
                            <Printer />
                        </Button>

                        <Button
                            onClick={() => HandleMediaDownload(media)}
                            className="rounded-full h-10 w-10"
                            variant={'outline'}
                        >
                            <Download />
                        </Button>
                        <Button
                            className="rounded-full h-10 w-10"
                            variant={'outline'}
                        >
                            <EllipsisVertical />
                        </Button>

                        <Button>
                            <Globe />
                            Share
                        </Button>
                        <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close>
                    </div>
                </DialogHeader>
                <div className="grid place-items-center py-4 w-full grow items-center">
                    <Image
                        src={media.source as string}
                        alt=""
                        height={500}
                        width={500}
                        className="h-10/12 object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,..."
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
