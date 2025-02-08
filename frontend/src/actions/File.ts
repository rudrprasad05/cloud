'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { Media } from '@/types';
import axios from 'axios';

export async function UploadOneFile(form: FormData) {
    const res = await axiosGlobal.post('media/create', form, {
        headers: {
            'Content-Type': 'mutipart/form-data',
        },
    });

    console.log(res);

    return res.data;
}
