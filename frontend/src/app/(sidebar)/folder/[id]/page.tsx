import { GetOneFolder } from '@/actions/Folders';
import NewFolderWithParentModal from '@/components/dialog/NewFolderWithParentModal';
import NewMediaModal from '@/components/dialog/NewMediaModal';
import ChildrenFolders from '@/components/folder/ChildrenFolders';
import FolderMedia from '@/components/folder/FolderMedia';
import Header from '@/components/folder/Header';
import MediaList from '@/components/home/MediaList';
import { Button, buttonVariants } from '@/components/ui/button';
import { ChevronRight, CloudUpload, Plus } from 'lucide-react';
import React from 'react';

interface IPage {
    params: { id: string };
}

export default async function page({ params }: IPage) {
    const { id } = await params;
    return <FolderData id={id} />;
}

async function FolderData({ id }: { id: string }) {
    const folder = await GetOneFolder(id);
    console.log(folder);
    if (!folder) {
        return (
            <div className="flex flex-col gap-2 grow">
                <div className="flex items-center justify-between">
                    <div className="text-2xl flex items-center gap-2 mb-2">
                        Cloud <ChevronRight />
                        {/* {folder.name} */}
                    </div>
                    <div className="flex gap-2 items-center">
                        <NewMediaModal>
                            <div
                                className={`${buttonVariants({
                                    variant: 'secondary',
                                })} w-full text-start justify-start px-2 my-2`}
                            >
                                <CloudUpload />
                                Upload
                            </div>
                        </NewMediaModal>
                        <NewFolderWithParentModal />
                    </div>
                </div>

                <div className="w-full h-48 border-dashed rounded border p-2 text-border grid place-items-center">
                    <h1>No folders found</h1>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-2 grow">
            <div className="flex items-center justify-between">
                <div className="text-2xl flex items-center gap-2 mb-2">
                    Cloud <ChevronRight />
                    {folder.name}
                </div>
                <div className="flex gap-2 items-center">
                    <NewMediaModal>
                        <div
                            className={`${buttonVariants({
                                variant: 'secondary',
                            })} w-full text-start justify-start px-2 my-2`}
                        >
                            <CloudUpload />
                            Upload
                        </div>
                    </NewMediaModal>
                    <NewFolderWithParentModal />
                </div>
            </div>
            <Header folders={folder} />
            <ChildrenFolders folders={folder.children} />
            <MediaList media={folder.medias} />
        </div>
    );
}
