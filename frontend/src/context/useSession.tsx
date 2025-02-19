'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { axiosGlobal } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { LoginResponse } from '@/types/schema';
import { RegisterFormType } from '@/types/zod';

interface User {
    id: string;
    email: string;
    username: string;
    token: string;
}

interface SessionContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterFormType) => Promise<void>;
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
        checkAuth();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const res = await axiosGlobal.post<LoginResponse>('auth/login', {
                username,
                password,
            });
            localStorage.setItem('token', res.data.token);
            let tempUser: User = {
                id: res.data.id,
                username: res.data.username,
                email: res.data.email,
                token: res.data.token,
            };
            setUser(tempUser);
            toast.success('Successfully logged in');
            router.push(redirect || '/my-cloud');
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Invalid credentials');
        }
    };

    const register = async (data: RegisterFormType) => {
        try {
            const res = await axiosGlobal.post<LoginResponse>('auth/register', {
                email: data.email,
                username: data.username,
                password: data.password,
            });
            localStorage.setItem('token', res.data.token);
            let tempUser: User = {
                id: res.data.id,
                username: res.data.username,
                email: res.data.email,
                token: res.data.token,
            };
            setUser(tempUser);
            toast.success('Successfully registered');
            router.push(redirect || '/my-cloud');
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Invalid credentials');
        }
    };

    // 🔹 Logout function
    const logout = (unAuth = false) => {
        destroyCookie(null, 'token');
        localStorage.removeItem('token');
        setUser(null);

        unAuth && toast.error('403 Unauthorised');

        router.push('/');
    };

    const checkAuth = async () => {
        let token = localStorage.getItem('token');
        if (token && token?.length > 0) {
            let res = await axiosGlobal
                .get<LoginResponse>('auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    if (res.status == 200) {
                        let tempUser: User = {
                            id: res.data.id,
                            username: res.data.username,
                            email: res.data.email,
                            token: res.data.token,
                        };
                        setUser(tempUser);
                    }
                })
                .catch(() => {
                    logout(true);
                })
                .finally(() => setIsLoading(false));
        } else {
            logout();
            setIsLoading(false);
            router.push('/');
        }
    };

    return (
        <SessionContext.Provider
            value={{ user, login, logout, isLoading, register }}
        >
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
