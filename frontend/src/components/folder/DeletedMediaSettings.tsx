'use client';

import {
    Download,
    Edit,
    Pen,
    Share,
    Star,
    TimerReset,
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
import DeleteForeverModal from '../dialog/DeleteForeverModal';
import RecoverMedia from '../dialog/RecoverMedia';

export default function DeletedMediaSettings({
    media,
}: {
    media: Partial<Media> | undefined;
}) {
    const [tempMedia, setTempMedia] = useState<Partial<Media> | undefined>(
        media
    );

    return (
        <div className="flex items-center gap-2 px-2">
            <DeleteForeverModal
                media={media}
                className="rounded-full hover:bg-background/50 text-white transition p-1"
            >
                <Trash2 className="w-4 h-4" />
            </DeleteForeverModal>
            <RecoverMedia
                media={media}
                className="rounded-full hover:bg-background/50 text-white transition p-1"
            >
                <TimerReset className="w-4 h-4" />
            </RecoverMedia>
        </div>
    );
}
