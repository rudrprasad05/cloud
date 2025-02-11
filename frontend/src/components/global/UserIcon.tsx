'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { useSession } from '@/context/useSession';

export default function UserIcon() {
    const [isLoading, setIsLoading] = useState(true);
    const { logout } = useSession();
    const { user } = useSession();
    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading)
        return (
            <div className="flex h-10 w-10 items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage src={'https://github.com/shadcn.png'} />
                    <AvatarFallback>
                        {user?.username?.slice(0, 1) || 'AZ'}
                    </AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent>
                <h1>{user?.username}</h1>
                <Button onClick={() => logout()}>Logout</Button>
            </PopoverContent>
        </Popover>
    );
}
