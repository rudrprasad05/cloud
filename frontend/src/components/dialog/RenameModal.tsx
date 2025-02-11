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
import { RenameMedia } from '@/actions/Media';

export default function RenameModal({
    children,
    media,
    className,
}: {
    children: ReactNode;
    media: Partial<Media> | undefined;
    className: string;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const form = useForm<RenameMediaFormType>({
        resolver: zodResolver(RenameMediaForm),
        defaultValues: {
            name: media?.name || '',
        },
    });
    if (!media) return <StopCircle />;

    const onSubmit: SubmitHandler<RenameMediaFormType> = async (data) => {
        setIsLoading(true);
        try {
            await RenameMedia(data.name, media?.id as string);
            toast.success('Media Renamed');
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
                        <Pen className="w-5 h-5" />
                        Rename Media
                    </DialogTitle>
                    <DialogDescription>
                        Rename your media or folder to an appropriate name
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="space-y-3"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            placeholder="enter name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">
                            {isLoading && (
                                <Loader2 className={'animate-spin mr-3'} />
                            )}
                            Create
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
