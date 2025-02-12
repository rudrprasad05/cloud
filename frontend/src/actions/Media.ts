'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { Media } from '@/types';
import axios from 'axios';
import { GetToken } from './User';

export async function GetMedia(token?: string) {
    const res = await axiosGlobal.get<Partial<Media>[]>('media/get-all', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

export async function GetStarMedia() {
    const token = await GetToken();
    if (!token) {
        throw new Error();
    }
    const res = await axiosGlobal.get<Partial<Media>[]>(
        'media/get-all?IsStarred=true',
        {
            headers: { Authorization: `Bearer ${token}` },
        }
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
