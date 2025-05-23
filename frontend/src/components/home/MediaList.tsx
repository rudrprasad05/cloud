import HandleSizeCalculation from '@/services/HandleSizeCalculation';
import { Media } from '@/types';
import { format } from 'date-fns';
import { FileImage, Folder, Image, Video } from 'lucide-react';
import React from 'react';

import ImageModal from '../dialog/ImageModal';
import LayoutCard from '../folder/LayoutCard';
import Settings from '../folder/Settings';
import DeletedMediaSettings from '../folder/DeletedMediaSettings';

interface IRecentList {
    media: Partial<Media>[] | undefined;
}

export default function MediaList({ media }: IRecentList) {
    if (!media || media.length === 0) {
        return <></>;
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
                        <div className="col-span-2 text-left">
                            {format(m.createdAt as string, 'dd MMM yyyy')}
                        </div>
                        <div className="col-span-2 text-left">
                            {<HandleSizeCalculation size={m.size} />}
                        </div>
                    </ImageModal>
                    <div className="p-2 col-span-2 group-hover:flex hidden flex-row-reverse">
                        {!m.isDeleted && <Settings media={m} />}
                        {m.isDeleted && <DeletedMediaSettings media={m} />}
                    </div>
                </LayoutCard>
            ))}
        </div>
    );
}
