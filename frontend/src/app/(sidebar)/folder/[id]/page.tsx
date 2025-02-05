import { GetOneFolder } from '@/actions/Folders';
import NewFolderWithParentModal from '@/components/dialog/NewFolderWithParentModal';
import FolderCard from '@/components/folder/FolderCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';

interface IPage {
    params: { id: string };
}

export default async function page({ params }: IPage) {
    const { id } = await params;
    return (
        <div>
            <FolderData id={id} />
        </div>
    );
}

async function FolderData({ id }: { id: string }) {
    const folder = await GetOneFolder(id);
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="text-xl">{folder.name}</div>
                <NewFolderWithParentModal />
            </div>
            <FolderCard folders={folder.children} />
        </div>
    );
}
