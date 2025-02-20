'use client';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useSession } from '@/context/useSession';
import {
    Calendar,
    Cloud,
    FileImage,
    Home,
    Inbox,
    Plus,
    Search,
    Settings,
    Star,
    Trash2,
    UsersRound,
} from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import React, { useEffect, useState } from 'react';
import { GoogleDriveSVG } from '../svg';
import { Button, buttonVariants } from '../ui/button';
import UserIcon from './UserIcon';
import NewFolderModal from '../dialog/NewFolderModal';
import NewMediaModal from '../dialog/NewMediaModal';
import { axiosGlobal } from '@/lib/axios';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { headers } from 'next/headers';
import { SumMedia } from '@/actions/Media';
import {
    HandleSizeConversion,
    HandleSizeConversionNumber,
} from '@/services/HandleSizeCalculation';

const items = [
    {
        title: 'Home',
        url: '/my-cloud',
        icon: Home,
    },
    {
        title: 'Starred',
        url: '/starred',
        icon: Star,
    },
    {
        title: 'Shared With Me',
        url: '/shared',
        icon: UsersRound,
    },
    {
        title: 'Bin',
        url: '/bin',
        icon: Trash2,
    },
    {
        title: 'Search',
        url: '#',
        icon: Search,
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings,
    },
];

export default function Navbar() {
    const { user } = useSession();
    const [sum, setsum] = useState(0);
    const [maxStorage, setMaxStorage] = useState(10);
    const [numInGb, setNumInGb] = useState<number>();

    useEffect(() => {
        const get = async () => {
            const res = await SumMedia();
            console.log(res);
            setsum(res);
            setNumInGb(() =>
                HandleSizeConversionNumber({ size: sum, name: 'GB' })
            );
        };
        get();
    }, [user]);
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div className="p-2 text-2xl flex gap-2 items-center">
                        <GoogleDriveSVG /> Cloud
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <Popover>
                                <PopoverTrigger className="my-2">
                                    <div
                                        className={`${buttonVariants({
                                            variant: 'default',
                                        })} w-full text-start justify-start px-2`}
                                    >
                                        <Plus />
                                        New
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="ml-2 flex flex-col gap-2">
                                    <NewFolderModal />
                                    <NewMediaModal>
                                        <div className="hover:bg-secondary rounded-md w-full text-start flex items-center gap-2 px-4 py-2 text-sm">
                                            <FileImage className="w-4 h-4" />
                                            New File
                                        </div>
                                    </NewMediaModal>
                                </PopoverContent>
                            </Popover>

                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="mt-auto">
                    <div>
                        <SidebarMenuButton asChild>
                            <Link href={'/storage'}>
                                <Cloud />
                                <span>Storage</span>
                            </Link>
                        </SidebarMenuButton>

                        <div className="flex flex-col w-full items-center gap-2 p-2">
                            <div className="w-full flex flex-col gap-1">
                                <div className="text-xs text-gray-500">
                                    <HandleSizeConversion
                                        size={sum}
                                        name="GB"
                                    />{' '}
                                    of {maxStorage} GB used
                                </div>
                                <div className="h-2 bg-gray-200 relative rounded-full w-full">
                                    <div
                                        style={{
                                            width: `${
                                                (numInGb ?? 0 / maxStorage) *
                                                100
                                            }%`,
                                        }}
                                        className={cn(
                                            `h-full absolute left-0 top-0  bg-primary rounded-full`
                                        )}
                                    ></div>
                                </div>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full"
                            >
                                Upgrade
                            </Button>
                        </div>
                    </div>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}
