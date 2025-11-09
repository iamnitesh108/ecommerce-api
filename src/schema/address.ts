import { z } from 'zod';

export const AddressSchema = z.object({
  lineOne: z.string(),
  lineTwo: z.string().nullable(),
  pincode: z.string(),
  country: z.string(),
  city: z.string(),
});
