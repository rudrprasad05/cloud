import { GetStarFolder } from '@/actions/Folders';
import { GetStarMedia } from '@/actions/Media';
import ChildrenFolders from '@/components/folder/ChildrenFolders';
import MediaList from '@/components/home/MediaList';

export default async function Home() {
    const media = await GetStarMedia();
    const folders = await GetStarFolder();

    if (media.length == 0 && folders.length == 0) {
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
                <h1 className="text-2xl">Starred</h1>
                <div className="flex flex-col gap-2 my-2">
                    <ChildrenFolders folders={folders} />
                    <MediaList media={media} />
                </div>
            </section>
        </main>
    );
}
