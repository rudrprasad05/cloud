import { ConfirmEmail } from '@/actions/User';
import React from 'react';

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Props) {
    const { token } = await searchParams;
    const res = await ConfirmEmail(token as string);
    if (res) {
        return <div>Email confimred</div>;
    }
    return <div>not confirmed</div>;
}
