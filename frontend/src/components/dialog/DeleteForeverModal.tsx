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
import { Folder, Media } from '@/types';
import { FileImage, Loader2, Pen, StopCircle } from 'lucide-react';
import Image from 'next/image';
import {
    NewFolderWithParentForm,
    NewFolderWithParentType,
    RenameMediaForm,
    RenameMediaFormType,
} from '@/types/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { DeleteForever, DeleteMedia, RenameMedia } from '@/actions/Media';
import { RenameFolder } from '@/actions/Folders';

export default function DeleteForeverModal({
    children,
    media,
    className,
}: {
    children: ReactNode;
    media: Partial<Media> | Partial<Folder> | undefined;
    className?: string;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    if (!media) return <StopCircle />;

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await DeleteForever(media.id as string);
            toast.success('Media Deleted');
            router.refresh();
        } catch (error) {
            toast.error('Failed creation');
        }
        setIsOpen(false);
        setIsLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className={className}>{children}</DialogTrigger>
            <DialogContent className="">
                <DialogHeader className="">
                    <DialogTitle className="flex items-center text-lg gap-4">
                        Delete Media
                    </DialogTitle>
                    <DialogDescription>
                        This will forever delete the media. Even we wont be able
                        to get it back
                    </DialogDescription>
                </DialogHeader>
                <div className="gap-2 flex flex-row">
                    <Button onClick={() => handleDelete()}>
                        {isLoading && <Loader2 className="animate-spin" />}
                        Delete
                    </Button>
                    <Button
                        disabled={isLoading}
                        variant={'secondary'}
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
