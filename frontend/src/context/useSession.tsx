'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { axiosGlobal } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

interface User {
    id: string;
    email: string;
    username: string;
    token: string;
}

interface SessionContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    // 🔹 Load session from cookies on mount
    useEffect(() => {
        const cookies = parseCookies();
        console.log('cookie', cookies);
        if (cookies.token) {
            axiosGlobal
                .get('auth/me')
                .then((res) => setUser(res.data))
                .catch(() => logout())
                .finally(() => setIsLoading(false));
        } else {
            logout();
            setIsLoading(false);
            router.push('/');
        }
    }, []);

    useEffect(() => {
        console.log('user', user);
    }, []);

    /**
     *
     * @param email
     * @param password
     */
    const login = async (username: string, password: string) => {
        try {
            const res = await axiosGlobal.post('auth/login', {
                username,
                password,
            });
            setCookie(null, 'token', res.data.token, { path: '/' }); // Save token in cookies
            setUser(res.data.user); // Update user state
            toast.success('Successfully logged in');
            router.push(redirect || '/home');
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Invalid credentials');
        }
    };

    // 🔹 Logout function
    const logout = () => {
        destroyCookie(null, 'token'); // Remove token
        setUser(null); // Clear user state
        router.push('/');
    };

    return (
        <SessionContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </SessionContext.Provider>
    );
}

// 🔹 Hook to use session data
export function useSession() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
