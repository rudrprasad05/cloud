import { Folder, Image, Video } from 'lucide-react';
import { format } from 'date-fns';
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
                <div className="flex w-full bg-sidebar rounded p-4 items-center gap-4">
                    <div>
                        {m.type === 0 && <Image />}
                        {m.type === 1 && <Video />}
                    </div>
                    <div>{m.source}</div>
                    <div className="flex gap-4 items-center">
                        <Folder className="w-4 h-4" />
                        {m.folderId}
                    </div>
                    <div className="ml-auto">
                        {format(m.createdAt || Date.now(), 'dd MMM yyy')}
                    </div>
                </div>
            ))}
        </div>
    );
}
