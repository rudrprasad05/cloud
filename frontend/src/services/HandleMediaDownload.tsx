import { API } from '@/constants';
import { Media } from '@/types';

export const HandleMediaDownload = async (media: Partial<Media>) => {
    try {
        const response = await fetch(
            API +
                `media/download?fileName=${
                    media?.source?.split('/')[
                        media?.source?.split('/').length - 1
                    ]
                }`
        );

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = media?.source?.split('/')[
            media?.source?.split('/').length - 1
        ] as string;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
