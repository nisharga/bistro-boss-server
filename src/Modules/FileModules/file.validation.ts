import { z } from 'zod'

const uploadFileZodSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    path: z.string().optional(),
  }),
})
export const FileValidation = {
  uploadFileZodSchema,
}
