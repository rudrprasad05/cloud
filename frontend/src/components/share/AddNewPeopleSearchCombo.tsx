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
import { User } from '@/types';
import { GetSharedUsers } from '@/actions/SharedUsers';

export function ComboboxDemo() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
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
        <Popover open={open} onOpenChange={setOpen}>
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
                        placeholder="Search framework..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>
                            <div>Enter new</div>
                        </CommandEmpty>
                        <CommandGroup>
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
                                    <CommandItem
                                        key={user.id}
                                        value={user.id}
                                        onSelect={(currentValue) => {
                                            setValue(
                                                currentValue === value
                                                    ? ''
                                                    : currentValue
                                            );
                                            setOpen(false);
                                        }}
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
