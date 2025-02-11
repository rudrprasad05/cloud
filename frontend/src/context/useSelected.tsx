'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type SelectedItem = {
    id: string;
    type: 'MEDIA' | 'FILE';
};

interface SelectedItemContextType {
    selectedItem: SelectedItem | undefined;
    addSelectedItem: (item: SelectedItem | undefined) => void;
}

const SelectedItemContext = createContext<SelectedItemContextType | undefined>(
    undefined
);

export function SelectedItemProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedItem, setSelectedItem] = useState<SelectedItem>();

    function addSelectedItem(item: SelectedItem | undefined) {
        setSelectedItem(item);
    }

    return (
        <SelectedItemContext.Provider value={{ addSelectedItem, selectedItem }}>
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
