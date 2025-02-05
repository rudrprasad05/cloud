import { GetFolder } from '@/actions/Folders';
import { GetMedia } from '@/actions/Media';
import FolderList from '@/components/home/FolderList';
import RecentList from '@/components/home/RecentList';

export default async function Home() {
    const folders = await GetFolder();
    const media = await GetMedia();

    return (
        <main className="flex flex-col gap-6">
            <section>
                <h1 className="text-2xl mb-2">Folders</h1>
                <FolderList folders={folders} />
            </section>
            <section>
                <h1 className="text-2xl mb-2">Recent</h1>
                <RecentList media={media} />
            </section>
        </main>
    );
}
