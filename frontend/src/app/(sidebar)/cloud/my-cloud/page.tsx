import { GetFolder } from '@/actions/Folders';
import { GetMedia } from '@/actions/Media';
import FolderList from '@/components/home/FolderList';
import MediaList from '@/components/home/MediaList';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
        return redirect('/');
    }
    const folders = await GetFolder();
    const media = await GetMedia(token);

    return (
        <main className="flex flex-col gap-6">
            <section>
                <h1 className="text-2xl mb-2">Folders</h1>
                <FolderList folders={folders} />
            </section>
            <section>
                <h1 className="text-2xl mb-2">Recent</h1>
                <MediaList media={media} />
            </section>
        </main>
    );
}
