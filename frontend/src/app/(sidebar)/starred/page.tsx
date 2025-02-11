import { GetStarMedia } from '@/actions/Media';
import RecentList from '@/components/home/MediaList';

export default async function Home() {
    const media = await GetStarMedia();

    return (
        <main className="flex flex-col gap-6">
            <section>
                <h1 className="text-2xl mb-2">Starred</h1>
                <RecentList media={media} />
            </section>
        </main>
    );
}
