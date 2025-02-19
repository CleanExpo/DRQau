import { z } from "zod"

export const consultationSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  category: z.enum(["general", "technical", "business", "legal", "health", "other"]),
  priority: z.enum(["low", "normal", "high", "urgent"]),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
        url: z.string().optional()
      })
    )
    .optional()
    .default([])
})

export type ConsultationFormData = z.infer<typeof consultationSchema>
