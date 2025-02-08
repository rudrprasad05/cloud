import { Media } from '@/types';
import { format } from 'date-fns';
import { FileImage, Folder, Image, Video } from 'lucide-react';
import React from 'react';
import LayoutCard from '../folder/LayoutCard';
import HandleSizeCalculation from '@/services/HandleSizeCalculation';
import Settings from '../folder/Settings';
import ImageModal from '../dialog/ImageModal';

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
                <LayoutCard>
                    <ImageModal
                        className="p-2 grid grid-cols-10 w-full col-span-10 text-left"
                        media={m}
                    >
                        <div className="flex items-center gap-4 col-span-6 flex-1 min-w-0 mr-4">
                            <FileImage className="w-5 h-5 text-muted-foreground" />
                            <div className="flex items-center flex-1 min-w-0 ml-0 text-left">
                                <div className="w-full flex items-center">
                                    <p className="truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                        {m.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 text-right">
                            {format(m.createdAt as string, 'dd MMM yyyy')}
                        </div>
                        <div className="col-span-2 text-right">
                            {<HandleSizeCalculation size={m.size} />}
                        </div>
                    </ImageModal>
                    <div className="p-2 col-span-2 group-hover:flex hidden flex-row-reverse">
                        <Settings media={m} />
                    </div>
                </LayoutCard>
            ))}
        </div>
    );
}
