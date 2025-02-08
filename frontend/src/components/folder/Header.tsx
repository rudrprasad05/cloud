import { Folder } from '@/types';
import { Images } from 'lucide-react';
import React from 'react';

export default function Header({ folders }: { folders: Partial<Folder> }) {
    //
    // return <></>;
    if (
        (folders.children && folders.children.length > 0) ||
        (folders.medias && folders.medias.length > 0)
    )
        return (
            <div className="grid grid-cols-12 text-muted-foreground">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Uploaded</div>
                <div className="col-span-2">Size</div>
            </div>
        );
    else {
        return (
            <div className="w-full h-full grow grid place-items-center">
                <div className="flex flex-col items-center gap-6 text-xl">
                    <Images className="w-12 h-12" />
                    Upload an Image to get Started
                </div>
            </div>
        );
    }
}
