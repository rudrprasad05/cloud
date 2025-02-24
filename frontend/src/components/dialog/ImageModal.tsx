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
import * as PopoverPrimitive from '@radix-ui/react-popover';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Media } from '@/types';
import {
    ClipboardPaste,
    Download,
    EllipsisVertical,
    FileImage,
    Globe,
    Pen,
    Printer,
    SquareArrowOutUpRight,
    SquareArrowUpRight,
    Star,
    X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button, buttonVariants } from '../ui/button';
import { HandleMediaDownload } from '@/services/HandleMediaDownload';
import MoveFolderModal from './MoveFolderModal';
import { axiosGlobal } from '@/lib/axios';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import RenameModal from './RenameModal';

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
    const [tempMedia, setTempMedia] = useState<Partial<Media> | undefined>(
        media
    );

    const handleStar = async () => {
        setTempMedia((prev) => (prev ? { ...prev, star: !prev.star } : prev));
        try {
            const res = await axiosGlobal.patch('media/star/' + tempMedia?.id, {
                star: !tempMedia?.star,
            });
            !tempMedia?.star && toast.success('Media was starred');
            tempMedia?.star && toast.success('Media was unstarred');
        } catch (error) {
            setTempMedia((prev) =>
                prev ? { ...prev, star: !prev.star } : prev
            );
            toast.error('Media could not be starred');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger
                onDoubleClick={() => setIsOpen(true)}
                onClick={() => {}}
                className={className}
            >
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-screen h-screen border-none w-full bg-white-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 flex flex-col">
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
                        <Popover>
                            <PopoverPrimitive.Trigger className="">
                                <Button
                                    className="rounded-full h-10 w-10"
                                    variant={'outline'}
                                >
                                    <EllipsisVertical />
                                </Button>
                            </PopoverPrimitive.Trigger>
                            <PopoverContent
                                align="end"
                                className="flex flex-col gap-2 p-0 py-4"
                            >
                                <MoveFolderModal>
                                    <div className="hover:bg-secondary px-3 py-2 flex items-center gap-2 text-sm">
                                        <ClipboardPaste className="h-4 w-4" />
                                        Move image
                                    </div>
                                </MoveFolderModal>
                                <div
                                    onClick={handleStar}
                                    className="cursor-pointer hover:bg-secondary px-3 py-2 flex items-center gap-2 text-sm"
                                >
                                    {tempMedia?.star ? (
                                        <>
                                            <Star
                                                className={cn(
                                                    'w-4 h-4 transition fill-white'
                                                )}
                                            />
                                            Remove image from starred
                                        </>
                                    ) : (
                                        <>
                                            <Star
                                                className={cn(
                                                    'w-4 h-4 transition fill-none'
                                                )}
                                            />
                                            Add image to starred
                                        </>
                                    )}
                                </div>
                                <RenameModal media={media}>
                                    <div className="hover:bg-secondary px-3 py-2 flex items-center gap-2 text-sm">
                                        <Pen className="h-4 w-4" />
                                        Rename
                                    </div>
                                </RenameModal>
                            </PopoverContent>
                        </Popover>

                        <Button>
                            <Globe />
                            Share
                        </Button>
                        {/* <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </DialogPrimitive.Close> */}
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
