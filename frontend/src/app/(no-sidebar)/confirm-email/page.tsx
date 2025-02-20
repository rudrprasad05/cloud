import { ConfirmEmail } from '@/actions/User';
import React from 'react';

interface IPageProps {
    params: {
        id: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export default async function Page({ params, searchParams }: IPageProps) {
    const { token } = await searchParams;
    const res = await ConfirmEmail(token as string);
    if (res) {
        return <div>Email confimred</div>;
    }
    return <div>not confirmed</div>;
}
