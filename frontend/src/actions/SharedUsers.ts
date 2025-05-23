'use server';

import { axiosGlobal } from '@/lib/axios';
import { User } from '@/types';
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

export async function CreateSharedUserWithUserIdShareId(
    userId: string,
    sharedId: string
) {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    try {
        const res = await axiosGlobal.post(
            'shared-user/create-with-user-id',
            { shareId: sharedId, userId: userId },
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

export async function GetSharedBySharedId(id: string) {
    const token = await GetToken();
    if (!token) {
        return redirect('/');
    }
    try {
        const res = await axiosGlobal.get('shared-user/get/' + id, {
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
