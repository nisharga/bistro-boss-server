import { z } from 'zod'

const createSingleUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    email: z.string().optional(),
  }),
})
export const SingleUserValidation = {
  createSingleUserZodSchema,
}
