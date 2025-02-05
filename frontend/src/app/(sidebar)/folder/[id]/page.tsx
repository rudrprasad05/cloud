import { GetOneFolder } from '@/actions/Folders';
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
    return <pre>{JSON.stringify(folder, null, 2)}</pre>;
}
