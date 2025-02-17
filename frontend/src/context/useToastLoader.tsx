'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { axiosGlobal } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { LoginResponse } from '@/types/schema';
import { RegisterFormType } from '@/types/zod';

export type LoadingItem = {
    displayName: string;
    id: string;
    isFinished: boolean;
};

interface ToastLoaderContextType {
    items: LoadingItem[];
    addLoadingItem: (item: LoadingItem) => void;
    collapse: boolean;
    handleCollapse: (val?: boolean) => void;
    hidden: boolean;
    handleSetHidden: (status: boolean) => void;
    updateStatus: (id: string) => void;
}

const ToastLoaderContext = createContext<ToastLoaderContextType | undefined>(
    undefined
);

export function ToastLoaderProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [items, setItems] = useState<LoadingItem[]>([]);
    const [collapse, setCollapse] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(true);

    function handleCollapse(val?: boolean) {
        if (!val) setCollapse((prev) => !prev);
        else setCollapse(val);
    }
    function handleSetHidden(status: boolean) {
        setHidden(status);
    }
    function updateStatus(id: string) {
        setItems((prev) => {
            let v = prev;
            v.map((i) => {
                if (i.id == id) {
                    i.isFinished = true;
                }
            });
            return v;
        });
    }

    function addLoadingItem(item: LoadingItem) {
        setItems((prev) => {
            return [item, ...prev];
        });
    }
    return (
        <ToastLoaderContext.Provider
            value={{
                items,
                addLoadingItem,
                collapse,
                handleCollapse,
                hidden,
                handleSetHidden,
                updateStatus,
            }}
        >
            {children}
        </ToastLoaderContext.Provider>
    );
}

// 🔹 Hook to use session data
export function useToastLoader() {
    const context = useContext(ToastLoaderContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
