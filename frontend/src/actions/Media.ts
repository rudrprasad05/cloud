'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { Media, MediaWithFolderName } from '@/types';
import axios from 'axios';

export async function GetMedia() {
    const res = await axiosGlobal.get<Partial<MediaWithFolderName>[]>(
        'media/get-all'
    );

    return res.data;
}
