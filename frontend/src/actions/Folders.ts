'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import axios from 'axios';

export async function GetFolder() {
    const res = await axiosGlobal.get<Partial<Folder>[]>('folder/get-all');

    return res.data;
}

export async function GetOneFolder(id: string) {
    console.log(id);
    const res = await axiosGlobal.get<Partial<Folder>>('folder/get-one/' + id);
    console.log(res);
    return res.data;
}

export async function CreateFolder(name: string, token: string) {
    const res = await axiosGlobal.post<Partial<Folder>>(
        'folder/create',
        { name },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
}
