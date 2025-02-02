'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { LoginResponse } from '@/types/schema';
import { SignInFormType } from '@/types/zod';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false, // Allow self-signed cert
});

export async function GetUser() {
    const res = await axiosGlobal.get(API + 'account/google/user', {
        withCredentials: true,
        httpAgent: agent,
    });
    return res;
}

export async function LoginUser(data: SignInFormType): Promise<LoginResponse> {
    const res = await axiosGlobal.post<LoginResponse>('auth/login', data);
    console.log(res);
    return res.data;
}
