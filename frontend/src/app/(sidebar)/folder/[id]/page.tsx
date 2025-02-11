import { GetOneFolder } from '@/actions/Folders';
import NewFolderWithParentModal from '@/components/dialog/NewFolderWithParentModal';
import NewMediaModal from '@/components/dialog/NewMediaModal';
import ChildrenFolders from '@/components/folder/ChildrenFolders';
import FolderMedia from '@/components/folder/FolderMedia';
import Header from '@/components/folder/Header';
import { Button } from '@/components/ui/button';
import { ChevronRight, Plus } from 'lucide-react';
import React from 'react';
import MediaList from '@/components/home/MediaList';

interface IPage {
    params: { id: string };
}

export default async function page({ params }: IPage) {
    const { id } = await params;
    return <FolderData id={id} />;
}

async function FolderData({ id }: { id: string }) {
    const folder = await GetOneFolder(id);
    return (
        <div className="flex flex-col gap-2 grow">
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
            <Header folders={folder} />
            <ChildrenFolders folders={folder.children} />
            <MediaList media={folder.medias} />
        </div>
    );
}
