'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { Folder } from '@/types';
import axios from 'axios';

export async function GetFolder() {
    const res = await axiosGlobal.get<Partial<Folder>[]>(
        'folder/get-all?IsParent=true'
    );

    return res.data;
}

export async function GetOneFolder(id: string) {
    const res = await axiosGlobal.get<Partial<Folder>>('folder/get-one/' + id);
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

export async function CreateFolderWithParent(
    name: string,
    parentId: string,
    token: string
) {
    const res = await axiosGlobal.post<Partial<Folder>>(
        'folder/create',
        { name, parentId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
}
