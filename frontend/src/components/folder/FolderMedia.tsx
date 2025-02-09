import HandleImageExtension from '@/services/HandleImageExtension';
import HandleSizeCalculation from '@/services/HandleSizeCalculation';
import { Media } from '@/types';
import { format } from 'date-fns';
import { FileImage, Minus } from 'lucide-react';
import React from 'react';

import ImageModal from '../dialog/ImageModal';
import LayoutCard from './LayoutCard';
import Settings from './Settings';

export default function FolderMedia({
    media,
}: {
    media: Partial<Media>[] | undefined;
}) {
    if (!media || media.length === 0) {
        return;
    }
    return (
        <div className="grid gap-2">
            {media.map((med) => (
                <LayoutCard>
                    <ImageModal
                        className="p-2 grid grid-cols-10 w-full col-span-10 text-left"
                        media={med}
                    >
                        <div className="flex items-center gap-4 col-span-6 flex-1 min-w-0 mr-4">
                            <FileImage className="w-5 h-5 text-muted-foreground" />
                            <div className="flex items-center flex-1 min-w-0">
                                <div className="w-full flex items-center">
                                    <p className="truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                        {med.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            {format(med.createdAt as string, 'dd MMM yyyy')}
                        </div>
                        <div className="col-span-2">
                            {<HandleSizeCalculation size={med.size} />}
                        </div>
                    </ImageModal>
                    <div className="col-span-2 group-hover:flex hidden flex-row-reverse">
                        <Settings media={med} />
                    </div>
                </LayoutCard>
            ))}
        </div>
    );
}
