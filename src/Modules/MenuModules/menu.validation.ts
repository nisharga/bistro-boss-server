import { z } from 'zod'

const createMenuZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    recipe: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    price: z.number().optional(),
  }),
})
export const MenuValidation = {
  createMenuZodSchema,
}
