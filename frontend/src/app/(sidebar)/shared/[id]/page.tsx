import { GetShareWithMedia } from '@/actions/Share';
import React from 'react';

interface IPageProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export default async function page({ params, searchParams }: IPageProps) {
    const { id } = await params;
    return <SharePage id={id} />;
}

const SharePage = async ({ id }: { id: string }) => {
    const media = await GetShareWithMedia(id);
    console.log(media);

    return (
        <div className="flex items-center flex-col p-6 gap-4  w-screen h-screen">
            <div className="grow"></div>
        </div>
    );
};
