'use client';

import { SelectedItem, useSelectedItem } from '@/context/useSelected';
import { useSession } from '@/context/useSession';
import { cn } from '@/lib/utils';
import { Folder } from '@/types';
import { Folder as FolderIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface IFolderList {
    folders: Partial<Folder>[] | undefined;
}

export default function FolderList({ folders }: IFolderList) {
    const session = useSession();
    const router = useRouter();
    const { selectedItem, addSelectedItem } = useSelectedItem();

    const handleClick = (id: string) => {
        if (selectedItem) {
            addSelectedItem(undefined);
            return;
        }
        var item: SelectedItem = {
            id,
            type: 'FILE',
        };
        addSelectedItem(item);
    };

    const handleDbClick = (id: string) => {
        router.push(`/folder/${id}`);
    };

    if (!folders || folders.length === 0) {
        return (
            <div className="w-full h-48 border-dashed rounded border p-2 text-border grid place-items-center">
                <h1>No folders found</h1>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            {folders.map((folder) => (
                <div
                    onDoubleClick={() => handleDbClick(folder.id as string)}
                    onClick={() => handleClick(folder.id as string)}
                    className={cn(
                        'flex w-full cursor-pointer rounded p-4 items-center gap-4',
                        selectedItem?.id == folder.id
                            ? 'bg-secondary'
                            : 'bg-sidebar'
                    )}
                >
                    <div>
                        <FolderIcon />
                    </div>
                    <div>{folder.name}</div>
                </div>
            ))}
        </div>
    );
}
