import { Folder } from '@/types';
import { Folder as FolderIcon } from 'lucide-react';
import React from 'react';

export default function ChildrenFolders({ folders }: { folders?: Folder[] }) {
    if (!folders || folders.length === 0) {
        return null;
    }
    return (
        <div className="grid gap-2">
            {folders.map((folder) => (
                <div className="flex gap-4 items-center ">
                    <FolderIcon className="w-5 h-5 text-muted-foreground" />
                    <div>{folder.name}</div>
                </div>
            ))}
        </div>
    );
}
