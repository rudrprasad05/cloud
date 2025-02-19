import { GetShareWithMedia } from '@/actions/Share';
import MediaSettings from '@/components/media/MediaSettings';
import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

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

    if (!media) {
        return redirect('/errors/403');
    }

    return (
        <div className="flex items-center flex-col p-6 gap-4  w-screen h-screen">
            <MediaSettings showShare={false} media={media.media} />
            <div className="grow">
                <div className="w-full h-full items-center">
                    <Image
                        src={media.media.source || ''}
                        alt="image"
                        height={500}
                        width={700}
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};
