'use client';

import {
    Download,
    Edit,
    Pen,
    Share,
    Star,
    Trash2,
    UserPlus,
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Media } from '@/types';
import { API } from '@/constants';
import { cn } from '@/lib/utils';
import { axiosGlobal } from '@/lib/axios';
import { toast } from 'sonner';
import RenameModal from '../dialog/RenameModal';
import { HandleMediaDownload } from '@/services/HandleMediaDownload';
import DeleteModal from '../dialog/DeleteModal';
import ShareModal from '../dialog/ShareModal';

export default function Settings({
    media,
}: {
    media: Partial<Media> | undefined;
}) {
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
        <div className="flex items-center gap-2 px-2">
            <DeleteModal
                media={media}
                className="rounded-full hover:bg-background/50 text-white transition p-1"
            >
                <Trash2 className="w-4 h-4" />
            </DeleteModal>
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <Download
                    onClick={() => HandleMediaDownload(media as Media)}
                    className="w-4 h-4"
                />
            </button>
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <Star
                    onClick={handleStar}
                    className={cn(
                        'w-4 h-4 transition',
                        tempMedia?.star ? 'fill-white' : 'fill-none'
                    )}
                />
            </button>
            <RenameModal
                media={media}
                className="rounded-full hover:bg-background/50 text-white transition p-1"
            >
                <Pen className="w-4 h-4" />
            </RenameModal>
            <ShareModal
                media={media}
                className="rounded-full hover:bg-background/50 text-white transition p-1"
            >
                <UserPlus className="w-4 h-4" />
            </ShareModal>
        </div>
    );
}
