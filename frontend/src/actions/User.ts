'use server';

import { API } from '@/constants';
import { axiosGlobal } from '@/lib/axios';
import { LoginResponse } from '@/types/schema';
import { SignInFormType } from '@/types/zod';
import axios from 'axios';
import https from 'https';
import { cookies } from 'next/headers';

const agent = new https.Agent({
    rejectUnauthorized: false, // Allow self-signed cert
});

export async function GetUser() {
    const res = await axiosGlobal.get('account/google/user', {
        withCredentials: true,
        httpAgent: agent,
    });
    return res;
}

export async function LoginUser(data: SignInFormType): Promise<LoginResponse> {
    const res = await axiosGlobal.post<LoginResponse>('auth/login', data);

    return res.data;
}

export async function GetToken(): Promise<string | undefined> {
    const a = await cookies();
    const token = a.get('token')?.value;

    if (!token) return undefined;
    return token;
}
