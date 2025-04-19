'use server';

import { axiosGlobal } from '@/lib/axios';

export async function UploadOneFile(form: FormData) {
    const res = await axiosGlobal.post('media/create', form, {
        headers: {
            'Content-Type': 'mutipart/form-data',
        },
    });

    return res.data;
}
