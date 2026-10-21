import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .max(254, "Email must not exceed 254 characters"),
  industry: z
    .string()
    .trim()
    .max(100, "Industry must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(2000, "Message must not exceed 2000 characters")
    .optional()
    .or(z.literal("")),
});
