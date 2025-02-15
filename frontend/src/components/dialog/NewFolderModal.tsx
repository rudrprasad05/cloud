'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { NewFolderForm, NewFolderType } from '@/types/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button, buttonVariants } from '../ui/button';
import { Folder, Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { CreateFolder } from '@/actions/Folders';

export default function NewFolderModal() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const form = useForm<NewFolderType>({
        resolver: zodResolver(NewFolderForm),
        defaultValues: {
            name: '',
        },
    });
    const onSubmit: SubmitHandler<NewFolderType> = async (data) => {
        setIsLoading(true);
        try {
            let token = localStorage.getItem('token');
            if (!token) {
                throw new Error();
            }
            await CreateFolder(data.name, token);
            toast.success('Folder Created');
            router.refresh();
        } catch (error) {
            setIsOpen(false);
            toast.error('Failed creation');
        }
        setIsOpen(false);
        setIsLoading(false);
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <div className="hover:bg-secondary rounded-md w-full text-start flex items-center gap-2 px-4 py-2 text-sm">
                    <Folder className="w-4 h-4" />
                    New Folder
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Folder</DialogTitle>
                    <DialogDescription>
                        Create a folder to store your files
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
