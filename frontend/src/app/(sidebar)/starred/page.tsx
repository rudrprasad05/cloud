import { GetFolder, GetStarFolder } from '@/actions/Folders';
import { GetStarMedia } from '@/actions/Media';
import ChildrenFolders from '@/components/folder/ChildrenFolders';
import MediaList from '@/components/home/MediaList';

export default async function Home() {
    const media = await GetStarMedia();
    const folders = await GetStarFolder();

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
