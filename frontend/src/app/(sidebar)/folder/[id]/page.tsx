import { GetOneFolder } from '@/actions/Folders';
import NewFolderWithParentModal from '@/components/dialog/NewFolderWithParentModal';
import NewMediaModal from '@/components/dialog/NewMediaModal';
import ChildrenFolders from '@/components/folder/ChildrenFolders';
import FolderMedia from '@/components/folder/FolderMedia';
import Header from '@/components/folder/Header';

import { Button } from '@/components/ui/button';
import { ChevronRight, Plus } from 'lucide-react';
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
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="text-2xl flex items-center gap-2 mb-2">
                    Cloud <ChevronRight />
                    {folder.name}
                </div>
                <div className="flex gap-2 items-center">
                    <NewMediaModal />
                    <NewFolderWithParentModal />
                </div>
            </div>
            <Header />
            <ChildrenFolders folders={folder.children} />
            <FolderMedia media={folder.medias} />
        </div>
    );
}
