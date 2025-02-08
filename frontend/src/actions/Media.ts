'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { Media } from '@/types';
import axios from 'axios';

export async function GetMedia() {
    const res = await axiosGlobal.get<Partial<Media>[]>('media/get-all');

    return res.data;
}
