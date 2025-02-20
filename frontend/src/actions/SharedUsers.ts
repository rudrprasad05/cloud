'use server';

import { axiosGlobal } from '@/lib/axios';
import { redirect } from 'next/navigation';
import { GetToken } from './User';
import { User } from '@/types';

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

export async function GetSharedUsers() {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    try {
        const res = await axiosGlobal.get<Partial<User>[]>(
            'shared-user/get-users',
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        return res.data;
    } catch (error) {
        return [];
    }
}
