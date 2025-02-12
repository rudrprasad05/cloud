import { GetFolder, GetStarFolder } from '@/actions/Folders';
import { GetStarMedia } from '@/actions/Media';
import ChildrenFolders from '@/components/folder/ChildrenFolders';
import RecentList from '@/components/home/MediaList';

export default async function Home() {
    const media = await GetStarMedia();
    const folders = await GetStarFolder();

    return (
        <main className="flex flex-col gap-6">
            <section>
                <h1 className="text-2xl mb-2">Starred</h1>
                <ChildrenFolders folders={folders} />
                <RecentList media={media} />
            </section>
        </main>
    );
}
