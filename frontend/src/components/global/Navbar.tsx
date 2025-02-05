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
import { Calendar, Home, Inbox, Plus, Search, Settings } from 'lucide-react';
import React from 'react';
import { GoogleDriveSVG } from '../svg';
import { Button } from '../ui/button';
import UserIcon from './UserIcon';
import NewFolderModal from '../dialog/NewFolderModal';

const items = [
    {
        title: 'Home',
        url: '#',
        icon: Home,
    },
    {
        title: 'Inbox',
        url: '#',
        icon: Inbox,
    },
    {
        title: 'Calendar',
        url: '#',
        icon: Calendar,
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
                            <NewFolderModal />
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
