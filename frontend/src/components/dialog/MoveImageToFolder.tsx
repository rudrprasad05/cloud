'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React, { useEffect, useState } from 'react';

import { GetFolder, MoveFolder } from '@/actions/Folders';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { RootDrive } from '@/constants';
import { useSelectedItem } from '@/context/useSelected';
import { Folder } from '@/types';
import { MoveFolderForm, MoveFolderFormType } from '@/types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function MoveFolderModal({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [folders, setFolders] = useState<Partial<Folder>[] | undefined>();
    const { selectedItem, addSelectedItem } = useSelectedItem();

    useEffect(() => {
        const getFolder = async () => {
            const res = await GetFolder();
            console.log(res);
            const filter = res.filter(
                (i) => i.id != (selectedItem as Folder).id
            );
            setFolders([RootDrive, ...filter]);
        };
        getFolder();
    }, [selectedItem]);

    const router = useRouter();
    const form = useForm<MoveFolderFormType>({
        resolver: zodResolver(MoveFolderForm),
        defaultValues: {
            id: '',
        },
    });
    const onSubmit: SubmitHandler<MoveFolderFormType> = async (data) => {
        setIsLoading(true);
        try {
            let token = localStorage.getItem('token');
            if (!token) {
                throw new Error();
            }
            await MoveFolder(data.id, selectedItem?.id);
            toast.success('Folder Moved');
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
            <DialogTrigger>{children}</DialogTrigger>
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
                            name="id"
                            render={({ field }) => {
                                return (
                                    <FormItem className="grow">
                                        <FormLabel>Parent Category</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            // defaultValue={
                                            //     !(selectedItem as Folder)
                                            //         .parentId
                                            //         ? '0'
                                            //         : ((selectedItem as Folder)
                                            //               .parentId as string)
                                            // }
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a tag" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {folders?.map((i) => (
                                                    <SelectItem
                                                        key={i.id}
                                                        value={i?.id as string}
                                                    >
                                                        {i.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
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
