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
    FileImage,
    Home,
    Inbox,
    Plus,
    Search,
    Settings,
    Star,
    Trash2,
} from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import React from 'react';
import { GoogleDriveSVG } from '../svg';
import { Button, buttonVariants } from '../ui/button';
import UserIcon from './UserIcon';
import NewFolderModal from '../dialog/NewFolderModal';
import NewMediaModal from '../dialog/NewMediaModal';

const items = [
    {
        title: 'Home',
        url: '/home',
        icon: Home,
    },
    {
        title: 'Starred',
        url: '/starred',
        icon: Star,
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
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
