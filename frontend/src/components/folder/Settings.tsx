'use client';

import { Download, Edit, Pen, Share, Star, UserPlus } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Media } from '@/types';
import { API } from '@/constants';

export default function Settings({
    media,
}: {
    media: Partial<Media> | undefined;
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
        <div className="flex items-center gap-2">
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <Download onClick={handleDownload} className="w-4 h-4" />
            </button>
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <Star className="w-4 h-4" />
            </button>
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <Pen className="w-4 h-4" />
            </button>
            <button className="rounded-full hover:bg-background/50 text-white transition p-1">
                <UserPlus className="w-4 h-4" />
            </button>
        </div>
    );
}
