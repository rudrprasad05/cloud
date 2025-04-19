'use server';

import { axiosGlobal } from '@/lib/axios';
import { Share } from '@/types';
import { redirect } from 'next/navigation';
import { GetToken } from './User';

export async function GetShare(id: string) {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    const res = await axiosGlobal.get<Share>('share/get/' + id, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
}

export async function GetShareWithMedia(id: string) {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    try {
        const res = await axiosGlobal.get<Share>('share/get-with-media/' + id, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
}

export async function UpdateShare(id: string, val: string) {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    const res = await axiosGlobal.patch<Share>(
        'share/update/' + id,
        { value: val },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return res.data;
}
