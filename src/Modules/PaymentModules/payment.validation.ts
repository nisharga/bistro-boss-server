import { z } from 'zod'

const createpaymentZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    trxid: z.string().optional(),
    price: z.string().optional(),
    quantity: z.string().optional(),
    date: z.string().optional(),
    cartItems: z.array(z.string()).optional(),
    productNames: z.array(z.string()).optional(),
  }),
})

export const PaymentValidation = {
  createpaymentZodSchema,
}
