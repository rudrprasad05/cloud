import { Folder } from '@/types';
import { Folder as FolderIcon } from 'lucide-react';
import React from 'react';

export default function FolderCard({ folders }: { folders?: Folder[] }) {
    if (!folders || folders.length === 0) {
        return null;
    }
    return (
        <div>
            {folders.map((folder) => (
                <div>
                    <FolderIcon />
                    <div>{folder.name}</div>
                </div>
            ))}
        </div>
    );
}
