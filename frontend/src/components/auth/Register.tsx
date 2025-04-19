'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useSession } from '@/context/useSession';
import { LoginState } from '@/types/enums';
import { RegisterForm, RegisterFormType } from '@/types/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Register({
    setState,
}: {
    setState: Dispatch<SetStateAction<LoginState>>;
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { register } = useSession();

    const form = useForm<RegisterFormType>({
        resolver: zodResolver(RegisterForm),
        defaultValues: {
            username: '',
            password: '',
            email: '',
        },
    });
    const onSubmit: SubmitHandler<RegisterFormType> = async (data) => {
        setIsLoading(true);
        try {
            await register(data);
        } catch (error) {
            toast.error('Failed login');
        }
        setIsLoading(false);
    };
    return (
        <div className="max-w-lg mx-auto min-h-screen grid place-items-center">
            <div className="space-y-3 w-full">
                <div className="mb-2 text-3xl text-center">Register</div>
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
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            placeholder="enter username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
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
                    <div className="">Already a member?</div>
                    <div
                        className="text-primary cursor-pointer"
                        onClick={() => setState(LoginState.LOGIN)}
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    );
}
