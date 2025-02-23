'use client';

import { useSelectedItem } from '@/context/useSelected';
import { Folder } from '@/types';
import { Folder as FolderIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import LayoutCard from './LayoutCard';
import { cn } from '@/lib/utils';

export default function ChildrenFolders({
    folders,
}: {
    folders?: Partial<Folder>[];
}) {
    const { selectedItem, addSelectedItem } = useSelectedItem();
    const router = useRouter();

    const handleClick = (folder: Folder) => {
        if (selectedItem?.id == folder.id) {
            addSelectedItem(undefined);
            return;
        }

        addSelectedItem(folder);
    };

    const handleDbClick = (id: string) => {
        router.push(`/cloud/folder/${id}`);
    };
    if (!folders || folders.length === 0) {
        return null;
    }
    return (
        <div className="grid gap-2">
            {folders.map((folder) => (
                <div
                    onDoubleClick={() => handleDbClick(folder.id as string)}
                    onClick={() => handleClick(folder as Folder)}
                    className={cn(
                        'cursor-pointer rounded transition group hover:bg-secondary',
                        selectedItem?.id == folder.id
                            ? 'bg-secondary'
                            : 'bg-transparent'
                    )}
                >
                    <LayoutCard>
                        <div className="p-2 flex col-span-6 items-center gap-4">
                            <FolderIcon className="w-5 h-5 text-muted-foreground" />
                            <div>{folder.name}</div>
                        </div>
                    </LayoutCard>
                </div>
            ))}
        </div>
    );
}
