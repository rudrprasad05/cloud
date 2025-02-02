import { GetFolder } from '@/actions/Folders';
import { GetMedia } from '@/actions/Media';
import FolderList from '@/components/home/FolderList';
import RecentList from '@/components/home/RecentList';

export default async function Home() {
    const folders = await GetFolder();
    const media = await GetMedia();
    console.log(media);
    if (folders.length === 0) {
        return (
            <div>
                <h1>No folders found</h1>
            </div>
        );
    }
    return (
        <main className="px-6 py-4 flex flex-col gap-6">
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
