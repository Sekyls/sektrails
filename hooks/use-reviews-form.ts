"use client";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { reviewSchema } from "@/lib/reviews-schema";

export default function reviewsFormHook() {
  const reviewForm = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
      ratings: "",
    },
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  const { control, handleSubmit, formState } = reviewForm;
  const { isLoading, isSubmitting, isValid } = formState;

  return { control, handleSubmit, isLoading, isSubmitting, isValid, reviewForm };
}
