import React from 'react';
import MediaList from '@/components/home/MediaList';
import { GetAllSharedById } from '@/actions/SharedUsers';

export default async function Home() {
    const media = await GetAllSharedById();
    console.log(media);

    return (
        <main className="flex flex-col gap-6">
            <section>
                <h1 className="text-2xl">Starred</h1>
                <div className="flex flex-col gap-2 my-2">
                    <MediaList media={media} />
                </div>
            </section>
        </main>
    );
}
