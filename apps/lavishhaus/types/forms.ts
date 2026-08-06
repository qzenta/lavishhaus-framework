import { z } from "zod";

export const quoteRequestSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  collection: z.string().optional(),
  spaceType: z.string().min(1, "Please select a space type."),
  budgetRange: z.string().optional(),
  message: z
    .string()
    .min(10, "Tell us a little more about what you're looking for.")
    .max(2000),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      error: "Please confirm you're happy for us to contact you.",
    }),
});

export type QuoteRequestValues = z.infer<typeof quoteRequestSchema>;

export const contactRequestSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Please add a short message.").max(2000),
});

export type ContactRequestValues = z.infer<typeof contactRequestSchema>;
