import {z} from 'zod';

const symbol = 'Must contain a big letter, number and a special character'

export const SingUpSchema = z.object({
    name: z
        .string()
        .min(5, {message: 'Name must be at least 5 characters long'})
        .trim(),
    password: z
        .string()
        .min(5, {message: 'Password must be at least 5 characters long'})
        .regex(/[A-Z]/, {message: symbol})
        .regex(/[0-9]/, {message: symbol})
        .regex(/[^a-zA-Z0-9]/, {message: symbol})
        .trim()
})

export type FormState = | {
    errors?: {
        name?: string,
        password?: string
    },
    message?: string
} | undefined