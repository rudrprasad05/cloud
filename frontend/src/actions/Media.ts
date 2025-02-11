'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { Media } from '@/types';
import axios from 'axios';

export async function GetMedia(token?: string) {
    const res = await axiosGlobal.get<Partial<Media>[]>('media/get-all', {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return res.data;
}

export async function GetStarMedia() {
    const res = await axiosGlobal.get<Partial<Media>[]>(
        'media/get-all?IsStarred=true'
    );

    return res.data;
}

export async function RenameMedia(name: string, id: string) {
    const res = await axiosGlobal.patch<Partial<Media>[]>(
        'media/rename/' + id,
        { name }
    );

    return res.data;
}
