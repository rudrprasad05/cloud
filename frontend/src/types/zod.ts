import z from 'zod';

export const SignInForm = z.object({
    username: z
        .string()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
    password: z
        .string()
        .min(2, { message: 'Should have more than 2 characters' })
        .max(50, { message: 'Should have less than 50 characters' }),
});

export type SignInFormType = z.infer<typeof SignInForm>;
