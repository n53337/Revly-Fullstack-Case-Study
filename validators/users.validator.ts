import { z } from "zod";

export const getUsersValidator = z.object({
  page: z.number().optional().default(1),
  limit: z.number().min(5).max(20).optional().default(10),
});

export const updateUserStatusValidator = z.object({
  status: z.boolean(),
});

export const assignVendorsValidator = z.object({
  vendor_id: z.number(),
  display_name: z.string(),
  is_enabled: z.boolean(),
});
