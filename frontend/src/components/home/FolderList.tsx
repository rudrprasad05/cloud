'use client';

import { useSession } from '@/context/useSession';
import { Folder } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface IFolderList {
    folders: Partial<Folder>[];
}

export default function FolderList({ folders }: IFolderList) {
    const session = useSession();

    if (folders.length === 0) {
        return (
            <div className="w-full h-48 border-dashed rounded border p-2 text-border grid place-items-center">
                <h1>No folders found</h1>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            {folders.map((folder) => (
                <Link href={`/folder/${folder.id}`} key={folder.id}>
                    <div className="flex w-full bg-sidebar rounded p-4 items-center gap-4">
                        <div>
                            <Folder />
                        </div>
                        <div>{folder.name}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
