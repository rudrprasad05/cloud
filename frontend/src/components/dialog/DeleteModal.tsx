'use client';

import { DeleteMedia } from '@/actions/Media';
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

export default function DeleteModal({
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
                        Delete Media
                    </DialogTitle>
                    <DialogDescription>
                        Dont worry, itll stay in the recycle bin for 30 days
                    </DialogDescription>
                </DialogHeader>
                <div className="gap-2 flex flex-row">
                    <Button onClick={() => onSubmit()}>
                        {isLoading && <Loader2 className="animate-spin" />}
                        Delete
                    </Button>
                    <Button
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
