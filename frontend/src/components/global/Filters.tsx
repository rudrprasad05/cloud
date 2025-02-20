'use client';

import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { User } from '@/types';
import { GetSharedUsers } from '@/actions/SharedUsers';
import { Loader2 } from 'lucide-react';

export default function Filters() {
    const [sharedUsers, setSharedUsers] = useState<Partial<User>[] | undefined>(
        undefined
    );
    useEffect(() => {
        const get = async () => {
            const res = await GetSharedUsers();
            setSharedUsers(res);
            console.log(res);
        };
        get();
    }, []);
    return (
        <div className="w-full h-10 rounded-lg grid grid-cols-4 items-center gap-6">
            <div className="flex items-center justify-between border-tpt-4">
                <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="mpaisa">mpaisa</SelectItem>
                            <SelectItem value="bsp">BSP</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="People" />
                        </SelectTrigger>
                        <SelectContent className="p-2">
                            {!sharedUsers && (
                                <div className="grid place-items-center">
                                    <Loader2 className="animate-spin" />
                                </div>
                            )}
                            {sharedUsers?.length == 0 && (
                                <div className="grid place-items-centertext-sm">
                                    No Users found
                                </div>
                            )}
                            {sharedUsers &&
                                sharedUsers?.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center gap-4 w-full my-2"
                                    >
                                        <Avatar>
                                            <AvatarImage src="" />
                                            <AvatarFallback>
                                                {user?.username?.slice(0, 2) ||
                                                    'AZ'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <h1 className="">
                                                {user.username}
                                            </h1>
                                            <p className="text-sm text-muted-foreground/70">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
