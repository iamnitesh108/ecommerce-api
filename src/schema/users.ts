import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginInput = z.infer<typeof LoginSchema>;
              
export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddressId: z.number().optional(),
    defaultBillingAddressId: z.number().optional()
})