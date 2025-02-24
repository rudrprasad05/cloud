'use client';

import { useSelectedItem } from '@/context/useSelected';
import {
    ClipboardPaste,
    Download,
    Edit,
    FolderPen,
    Link,
    Move,
    Star,
    Trash,
    UserPlus,
    X,
} from 'lucide-react';
import React, { useState } from 'react';
import MoveFolderModal from '../dialog/MoveFolderModal';
import { Folder } from '@/types';
import { axiosGlobal } from '@/lib/axios';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { StarFolder } from '@/actions/Folders';
import { useRouter } from 'next/navigation';
import ToolTipGlobal from './ToolTipGlobal';
import RenameModal from '../dialog/RenameModal';

export default function SelectBox() {
    const { selectedItem, setSelectedItem } = useSelectedItem();
    const router = useRouter();

    const handleStar = async (): Promise<void> => {
        if (!selectedItem) return;
        try {
            await StarFolder(selectedItem as Folder);
            if (!selectedItem?.star) {
                toast.success('Media was starred');
            } else {
                selectedItem?.star && toast.success('Media was unstarred');
            }
        } catch (error) {
            toast.error('Media could not be starred');
            router.refresh();
            return;
        }
        setSelectedItem((prev) =>
            prev ? { ...prev, star: !prev.star } : prev
        );
        router.refresh();
    };

    return (
        <div className="w-full h-10 rounded-lg text-sm bg-secondary flex gap-6 px-2">
            <div className="flex items-center gap-2">
                <div
                    className="cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40"
                    onClick={() => setSelectedItem(undefined)}
                >
                    <X className="h-4 w-4" />
                </div>
                Selected
            </div>
            <div className="flex gap-2 items-center">
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <ToolTipGlobal text="Share">
                        <UserPlus className="h-4 w-4" />
                    </ToolTipGlobal>
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <ToolTipGlobal text="Download">
                        <Download className="h-4 w-4" />
                    </ToolTipGlobal>
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <ToolTipGlobal text="Move">
                        <MoveFolderModal>
                            <ClipboardPaste className="h-4 w-4" />
                        </MoveFolderModal>
                    </ToolTipGlobal>
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <RenameModal media={selectedItem}>
                        <ToolTipGlobal text="Rename">
                            <FolderPen className="h-4 w-4" />
                        </ToolTipGlobal>
                    </RenameModal>
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <ToolTipGlobal text="Delete">
                        <Trash className="h-4 w-4" />
                    </ToolTipGlobal>
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <ToolTipGlobal text="Copy Link">
                        <Link className="h-4 w-4" />
                    </ToolTipGlobal>
                </div>
                <div className="grid place-items-center cursor-pointer transition w-6 h-6 p-1 rounded-full hover:bg-background/40">
                    <ToolTipGlobal text="Star">
                        <Star
                            onClick={handleStar}
                            className={cn(
                                'w-4 h-4 transition',
                                selectedItem?.star ? 'fill-white' : 'fill-none'
                            )}
                        />
                    </ToolTipGlobal>
                </div>
            </div>
        </div>
    );
}
