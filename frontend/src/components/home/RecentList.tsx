import { Media } from '@/types';
import { format } from 'date-fns';
import { FileImage, Folder, Image, Video } from 'lucide-react';
import React from 'react';

interface IRecentList {
    media: Partial<Media>[];
}

export default function RecentList({ media }: IRecentList) {
    if (media.length === 0) {
        return (
            <div className="w-full h-48 border-dashed rounded border p-2 text-border grid place-items-center">
                <h1>No media found</h1>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-4 w-full">
            {media.map((m) => (
                <div className="grid grid-cols-12 w-full bg-sidebar rounded p-4 items-center gap-4">
                    <div className="flex gap-4 items-center col-span-6">
                        {m.type === 0 && <FileImage />}
                        {m.type === 1 && <Video />}
                        <div className="truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                            {m.name}
                        </div>
                    </div>
                    <div className="flex gap-4 items-center col-span-3">
                        <Folder className="w-6 h-6" />
                        {m.folder?.name}
                    </div>
                    <div className="ml-auto col-span-3">
                        {format(m.createdAt || Date.now(), 'dd MMM yyy')}
                    </div>
                </div>
            ))}
        </div>
    );
}
