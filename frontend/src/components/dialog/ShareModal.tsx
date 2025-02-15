'use client';

import React, { ReactNode, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Folder, Media } from '@/types';
import { FileImage, Link2, Loader2, Lock, Pen, StopCircle } from 'lucide-react';
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
import { DeleteMedia, RenameMedia } from '@/actions/Media';
import { RenameFolder } from '@/actions/Folders';

export default function ShareModal({
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

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            await DeleteMedia(media.id as string);
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
                        Share Media
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <h1>General Access</h1>
                    <div className="gap-2 flex flex-row items-center">
                        <Lock />
                        <div className="text-sm">
                            <p>Restricted Access</p>
                            <p>Only those with access can open this file</p>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant={'outline'}>
                        <Link2 />
                        Copy Link
                    </Button>
                    <Button onClick={() => setIsOpen(false)}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
