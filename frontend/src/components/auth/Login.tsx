'use client';

import { SignInForm, SignInFormType } from '@/types/zod';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { LoginUser } from '@/actions/User';
import { toast } from 'sonner';
import { SetCookie } from '@/lib/cookie';
import { useSession } from '@/context/useSession';
import { LoginState } from '@/types/enums';

export default function Login({
    setState,
}: {
    setState: Dispatch<SetStateAction<LoginState>>;
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useSession();

    const form = useForm<SignInFormType>({
        resolver: zodResolver(SignInForm),
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const onSubmit: SubmitHandler<SignInFormType> = async (data) => {
        setIsLoading(true);
        try {
            await login(data.username, data.password);
        } catch (error) {
            toast.error('Failed login');
        }
        setIsLoading(false);
    };
    return (
        <div className="max-w-lg mx-auto min-h-screen grid place-items-center">
            <div className="space-y-3 w-full">
                <div className="mb-2 text-3xl text-center">Login</div>

                <Form {...form}>
                    <form
                        className="space-y-3"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            placeholder="enter email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    isPasswordVisible
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                autoComplete="off"
                                                placeholder="enter password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (isPasswordVisible)
                                                        setIsPasswordVisible(
                                                            false
                                                        );
                                                    else
                                                        setIsPasswordVisible(
                                                            true
                                                        );
                                                }}
                                                className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                                            >
                                                {isPasswordVisible ? (
                                                    <Eye className="stroke-muted-foreground w-5 h-5" />
                                                ) : (
                                                    <EyeOff className="stroke-muted-foreground w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" type="submit">
                            {isLoading && (
                                <Loader2 className={'animate-spin mr-3'} />
                            )}
                            Login
                        </Button>
                    </form>
                </Form>
                <div className="justify-center flex gap-2 text-sm items-center text-muted-foreground">
                    <div className="">Not a member?</div>
                    <div
                        className="text-primary cursor-pointer"
                        onClick={() => setState(LoginState.REGISTER)}
                    >
                        Register Now
                    </div>
                </div>
            </div>
        </div>
    );
}
