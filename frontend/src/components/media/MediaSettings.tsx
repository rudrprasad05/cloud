'use client';

import { API } from '@/constants';
import { Media } from '@/types';
import { Download, FileImage, Globe, Printer } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

export default function MediaSettings({
    media,
    showShare = true,
}: {
    media: Partial<Media>;
    showShare?: boolean;
}) {
    const handleDownload = async () => {
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
    return (
        <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
                <FileImage />
                {media.name}
            </div>
            <div className="flex items-center gap-2">
                <Button
                    onClick={() => handleDownload()}
                    className="rounded-full h-10 w-10"
                    variant={'outline'}
                >
                    <Printer />
                </Button>
                <Button
                    onClick={() => handleDownload()}
                    className="rounded-full h-10 w-10"
                    variant={'outline'}
                >
                    <Download />
                </Button>
                {showShare && (
                    <Button>
                        <Globe />
                        Share
                    </Button>
                )}
            </div>
        </div>
    );
}
