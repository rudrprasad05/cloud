'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { Folder } from '@/types';
import axios from 'axios';
import { GetToken } from './User';

export async function GetFolder() {
    const token = await GetToken();
    const res = await axiosGlobal.get<Partial<Folder>[]>(
        'folder/get-all?IsParent=true',
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return res.data;
}

export async function GetStarFolder() {
    const token = await GetToken();
    const res = await axiosGlobal.get<Partial<Folder>[]>(
        'folder/get-all?IsStarred=true',
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return res.data;
}

export async function GetAllFolder() {
    const token = await GetToken();
    const res = await axiosGlobal.get<Partial<Folder>[]>(
        'folder/get-all?IsParent=false',
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return res.data;
}

export async function GetOneFolder(id: string) {
    try {
        const res = await axiosGlobal.get<Partial<Folder>>(
            'folder/get-one/' + id
        );
        return res.data;
    } catch (error) {
        return null;
    }
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

export async function StarFolder(tempMedia: Folder) {
    console.log(tempMedia);
    const res = await axiosGlobal.patch('folder/star/' + tempMedia?.id, {
        star: tempMedia.star ? false : true,
    });
    return res.data;
}
