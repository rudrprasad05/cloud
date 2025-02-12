'use client';

import { Folder, Media } from '@/types';
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

interface SelectedItemContextType {
    selectedItem: Folder | Media | undefined;
    addSelectedItem: (item: Folder | Media | undefined) => void;
    setSelectedItem: Dispatch<SetStateAction<Folder | Media | undefined>>;
}

const SelectedItemContext = createContext<SelectedItemContextType | undefined>(
    undefined
);

export function SelectedItemProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedItem, setSelectedItem] = useState<
        Folder | Media | undefined
    >();

    function addSelectedItem(item: Folder | Media | undefined) {
        setSelectedItem(item);
    }

    return (
        <SelectedItemContext.Provider
            value={{ addSelectedItem, selectedItem, setSelectedItem }}
        >
            {children}
        </SelectedItemContext.Provider>
    );
}

// 🔹 Hook to use session data
export function useSelectedItem() {
    const context = useContext(SelectedItemContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
