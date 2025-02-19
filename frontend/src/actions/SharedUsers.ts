'use server';

import { axiosGlobal } from '@/lib/axios';
import { redirect } from 'next/navigation';
import { GetToken } from './User';

export async function CreateSharedUser(sharedId: string) {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    try {
        const res = await axiosGlobal.post(
            'shared-user/create',
            { shareId: sharedId },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return res;
    } catch (error) {
        return null;
    }
}

export async function GetAllSharedById() {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    try {
        const res = await axiosGlobal.get('shared-user/get', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
}
