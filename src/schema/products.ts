import z from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  tags: z.array(z.string()).nonempty(),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
