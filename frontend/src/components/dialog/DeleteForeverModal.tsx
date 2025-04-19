'use client';

import { DeleteForever } from '@/actions/Media';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Folder, Media } from '@/types';
import { Loader2, StopCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

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
