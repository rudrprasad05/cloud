import { GetAllSharedById } from '@/actions/SharedUsers';
import MediaList from '@/components/home/MediaList';
import React from 'react';

export default async function Home() {
    const media = await GetAllSharedById();

    if (media.length == 0) {
        return (
            <main className="flex flex-col gap-6">
                <section>
                    <h1 className="text-2xl">Starred</h1>

                    <div className="my-2 w-full h-48 border-dashed rounded border p-2 text-border grid place-items-center">
                        <h1>No folders found</h1>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className="flex flex-col gap-6">
            <section>
                <h1 className="text-2xl">Shared With Me</h1>
                <div className="flex flex-col gap-2 my-2">
                    <MediaList media={media} />
                </div>
            </section>
        </main>
    );
}
