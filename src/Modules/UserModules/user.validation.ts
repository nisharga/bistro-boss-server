 
import { z } from "zod";
        
const createOrderZodSchema = z.object({
    body: z.object({ 
        id: z.string(),
        name: z.string().optional(),
        price: z.number().optional(),
        email: z.string().optional(),
    }), 
});
export const OrderValidation = {
    createOrderZodSchema,
}