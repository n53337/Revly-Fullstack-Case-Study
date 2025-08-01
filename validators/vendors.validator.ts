import { z } from "zod";

export const getVendorsValidator = z.object({
    page: z.number().optional().default(1),
    limit: z.number().min(5).max(20).optional().default(10),
});