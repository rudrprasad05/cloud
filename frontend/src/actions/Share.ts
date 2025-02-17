'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { Media, Share } from '@/types';
import axios from 'axios';
import { GetToken } from './User';
import { redirect } from 'next/navigation';

export async function GetShare(id: string) {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    const res = await axiosGlobal.get<Share>('share/get/' + id, {
        headers: { Authorization: `Bearer ${token}` },
    });

    console.log(res.data);
    return res.data;
}
