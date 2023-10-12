import { z } from 'zod'

const createOrderZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    image: z.string().optional(),
    price: z.number().optional(),
    email: z.string().optional(),
  }),
})
export const OrderValidation = {
  createOrderZodSchema,
}
