'use client';
import React, { useEffect, useState } from 'react';

import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Folder, Media, Share, User } from '@/types';
import {
    CreateSharedUserWithUserIdShareId,
    GetSharedUsers,
} from '@/actions/SharedUsers';
import { GetUserByEmail } from '@/actions/User';
import { ValidateEmail } from '@/services/ValidateEmail';
import { useRouter } from 'next/navigation';

export function ComboboxDemo({ share }: { share: Partial<Share> | undefined }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();
    const [sharedUsers, setSharedUsers] = useState<Partial<User>[] | undefined>(
        undefined
    );
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [searchedUsers, setSearchedUsers] = useState<
        Partial<User> | undefined
    >(undefined);
    useEffect(() => {
        const get = async () => {
            const res = await GetSharedUsers();
            setSharedUsers(res);
        };
        get();
    }, []);

    const handleCommandClick = async (currentValue: string) => {
        console.log(currentValue);
        setValue(currentValue === value ? '' : currentValue);
        const res = await CreateSharedUserWithUserIdShareId(
            currentValue,
            share?.id as string
        );
        console.log(res);
        router.refresh();
        setOpen(false);
    };

    const handleSearchChange = async (val: string) => {
        setSearchValue(val);
        console.log(sharedUsers);
        console.log(refreshCounter);
        if (ValidateEmail(val)) {
            const res = await GetUserByEmail(val);
            setSharedUsers((prev) => [res, ...(prev ?? [])]);
            setRefreshCounter((prev) => prev++);
            console.log(res);
        }
    };
    return (
        <Popover open={open} onOpenChange={setOpen} key={refreshCounter}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between mb-2"
                >
                    {value
                        ? sharedUsers?.find(
                              (framework) => framework.id === value
                          )?.username
                        : 'Add collaborators'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[400px] p-0 ">
                <Command>
                    <CommandInput
                        value={searchValue}
                        onValueChange={(v) => handleSearchChange(v)}
                        placeholder="Enter email..."
                        className="h-9"
                    />
                    <CommandList>
                        {sharedUsers && (
                            <CommandEmpty>
                                <div>No user found</div>
                            </CommandEmpty>
                        )}
                        <CommandGroup>
                            {!sharedUsers && (
                                <div className="grid place-items-center">
                                    <Loader2 className="animate-spin" />
                                </div>
                            )}
                            {/* {searchedUsers && <div>{searchedUsers.email}</div>}
                            {searchedUsers && (
                                <CommandItem
                                    key={searchedUsers.id}
                                    value={searchedUsers.id}
                                    onSelect={(currentValue) =>
                                        handleCommandClick(currentValue)
                                    }
                                >
                                    <div
                                        key={searchedUsers.id}
                                        className="flex items-center gap-4 w-full my-2"
                                    >
                                        <Avatar>
                                            <AvatarImage src="" />
                                            <AvatarFallback>
                                                {searchedUsers?.username?.slice(
                                                    0,
                                                    2
                                                ) || 'AZ'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <h1 className="">
                                                {searchedUsers.username}
                                            </h1>
                                            <p className="text-sm text-muted-foreground/70">
                                                {searchedUsers.email}
                                            </p>
                                        </div>
                                    </div>
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === searchedUsers.id
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            )} */}

                            {sharedUsers &&
                                sharedUsers?.map((user) => (
                                    <CommandItem
                                        key={user.id}
                                        value={user.id}
                                        onSelect={(currentValue) =>
                                            handleCommandClick(currentValue)
                                        }
                                    >
                                        <div
                                            key={user.id}
                                            className="flex items-center gap-4 w-full my-2"
                                        >
                                            <Avatar>
                                                <AvatarImage src="" />
                                                <AvatarFallback>
                                                    {user?.username?.slice(
                                                        0,
                                                        2
                                                    ) || 'AZ'}
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
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                value === user.id
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
