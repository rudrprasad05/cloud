import { GetOne } from '@/actions/Media';
import MediaSettings from '@/components/media/MediaSettings';
import { Button } from '@/components/ui/button';
import { API } from '@/constants';
import { Download, FileImage, Globe } from 'lucide-react';
import Image from 'next/image';
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
    return <MediaPage id={id} />;
}

const MediaPage = async ({ id }: { id: string }) => {
    const media = await GetOne(id);

    return (
        <div className="flex items-center flex-col p-6 gap-4  w-screen h-screen">
            <MediaSettings media={media} />
            <div className="grow">
                <div className="w-full h-full items-center">
                    <Image
                        src={media.source || ''}
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
