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
import { CloudUpload, Image, Loader2, Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { CreateFolder } from '@/actions/Folders';
import { cn } from '@/lib/utils';

export default function NewMediaModal() {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | undefined>();
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const form = useForm<NewFolderType>({
        resolver: zodResolver(NewFolderForm),
        defaultValues: {
            name: '',
        },
    });
    function handleImageUpload(file: File) {
        setFile(file);
    }
    function HandleAfterImageSelect() {
        if (!file) {
            return (
                <label
                    htmlFor="file"
                    className={cn(
                        'cursor-pointer',
                        file && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <div className="items-center rounded-md p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex gap-3">
                        <Upload />
                        <h2 className="text-sm">Upload Image</h2>
                    </div>
                    <input
                        id="file"
                        type="file"
                        accept='accept="image/png, image/gif, image/jpeg, image/jpg"'
                        name="file"
                        disabled={file}
                        hidden
                        onChange={(e) => {
                            handleImageUpload(e.target.files?.[0] as File);
                        }}
                    />
                </label>
            );
        }
        return (
            <div>
                <div className="flex">
                    <Image />
                    <div>{file.name}</div>
                </div>
                <Button className="w-full" type="submit">
                    {isLoading && <Loader2 className={'animate-spin mr-3'} />}
                    Upload
                </Button>
            </div>
        );
    }
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
                <div
                    className={`${buttonVariants({
                        variant: 'secondary',
                    })} w-full text-start justify-start px-2 my-2`}
                >
                    <CloudUpload />
                    Upload
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Media Upload</DialogTitle>
                    <DialogDescription>
                        Upload a file to cloud
                    </DialogDescription>
                </DialogHeader>
                <HandleAfterImageSelect />
            </DialogContent>
        </Dialog>
    );
}
