import { GetOne } from '@/actions/Media';
import MediaSettings from '@/components/media/MediaSettings';
import Image from 'next/image';

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: Props) {
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
