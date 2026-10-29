import { z } from "zod";

export const quoteRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30)
    .regex(/^[+\d][\d\s()-]*$/, "Please enter a valid phone number."),
  collection: z.string().max(100).optional(),
  piece: z.string().max(100).optional(),
  spaceType: z.string().min(1, "Please select a space type.").max(50),
  budgetRange: z.string().max(50).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more about what you're looking for.")
    .max(2000, "Please keep your message under 2,000 characters."),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      error: "Please confirm you're happy for us to contact you.",
    }),
});

export type QuoteRequestValues = z.infer<typeof quoteRequestSchema>;

export const contactRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(30).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please add a short message.")
    .max(2000, "Please keep your message under 2,000 characters."),
});

export type ContactRequestValues = z.infer<typeof contactRequestSchema>;
