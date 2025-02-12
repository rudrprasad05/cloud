import { Folder } from '@/types';
import { Folder as FolderIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import LayoutCard from './LayoutCard';

export default function ChildrenFolders({
    folders,
}: {
    folders?: Partial<Folder>[];
}) {
    if (!folders || folders.length === 0) {
        return null;
    }
    return (
        <div className="grid gap-2">
            {folders.map((folder) => (
                <Link href={'/folder/' + folder.id}>
                    <LayoutCard>
                        <div className="p-2 flex col-span-6 items-center gap-4">
                            <FolderIcon className="w-5 h-5 text-muted-foreground" />
                            <div>{folder.name}</div>
                        </div>
                    </LayoutCard>
                </Link>
            ))}
        </div>
    );
}
