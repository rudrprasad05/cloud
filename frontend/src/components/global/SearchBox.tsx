'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Cog, Search, SlidersHorizontal } from 'lucide-react';
import UserIcon from './UserIcon';
import { useSession } from '@/context/useSession';
import Filters from './Filters';
import SelectBox from './SelectBox';
import { useSelectedItem } from '@/context/useSelected';

export default function SearchBox() {
    const { user } = useSession();
    const { selectedItem } = useSelectedItem();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center gap-6">
                <div className="relative grow flex rounded-lg border-input border py-2 px-5 justify-between items-center">
                    <div className="flex items-center gap-6">
                        <Search className="cursor-pointer w-5 h-5 text-muted-foreground" />
                        <input
                            placeholder="Search cloud"
                            className="bg-transparent focus:outline-none"
                        />
                    </div>
                    <SlidersHorizontal className="cursor-pointer h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-3">
                    <Cog className="h-6 w-6" />
                    <UserIcon />
                </div>
            </div>
            <>{selectedItem ? <SelectBox /> : <Filters />}</>
        </div>
    );
}
