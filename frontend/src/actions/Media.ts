'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { Media } from '@/types';
import axios from 'axios';
import { GetToken } from './User';
import { redirect } from 'next/navigation';

export async function GetMedia(token?: string) {
    const res = await axiosGlobal.get<Partial<Media>[]>('media/get-all', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
}

export async function GetStarMedia() {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    const res = await axiosGlobal.get<Partial<Media>[]>(
        'media/get-all?IsStarred=true',
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return res.data;
}

export async function GetDeleted() {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    const res = await axiosGlobal.get<Partial<Media>[]>(
        'media/get-all?IsDeleted=true',
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

export async function DeleteMedia(id: string) {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    const res = await axiosGlobal.delete<Partial<Media>[]>(
        'media/recycle/' + id,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return res.data;
}

export async function DeleteForever(id: string) {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    const res = await axiosGlobal.delete<Partial<Media>[]>(
        'media/delete/' + id,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return res.data;
}

export async function GetOne(id: string): Promise<Partial<Media>> {
    try {
        const token = await GetToken();
        console.log('token', token);
        if (!token || token == '' || token == undefined) {
            return redirect('/errors/403');
        }
        const res = await axiosGlobal.get<Partial<Media>>(
            'media/get-one/' + id,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (
                error.response?.status === 400 ||
                error.response?.status === 403
            ) {
                return redirect('/errors/403');
            }
        }

        console.error('Unexpected error:', error);
        return redirect('/errors/403');
    }
}
