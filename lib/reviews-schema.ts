import { z } from "zod/v4";

export const reviewSchema = z
  .object({
    review: z
      .string()
      .min(4, "Your review must be at least 4 characters long")
      .max(200, "Your review must be at most 500 characters long"),
    ratings: z.string().min(1, "Please select a rating"),
  })
  .required();
