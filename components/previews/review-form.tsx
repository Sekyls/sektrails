"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, withToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Star } from "lucide-react";
import { useAuth } from "@/providers/firebase-auth-provider";
import reviewsFormHook from "@/hooks/use-reviews-form";
import { reviewSchema } from "@/lib/reviews-schema";
import { handleAddReview } from "@/lib/reviews";
import { ReviewFormData, ReviewFormProps } from "@/lib/types";
import { z } from "zod/v4";

export default function ReviewForm({ mediaType, resourceID }: ReviewFormProps) {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    isLoading,
    isSubmitting,
    isValid,
    reviewForm,
  } = reviewsFormHook();

  function onSubmit(values: z.infer<typeof reviewSchema>) {
    const reviewFormData = {
      mediaType,
      resourceID,
      userId: user?.uid,
      name: user?.displayName,
      profileImage: user?.photoURL,
      ...values,
    };
    withToast(handleAddReview(reviewFormData as ReviewFormData), {
      loading: "Adding review...",
      success: "Review addition successful",
    });
  }

  return (
    <Dialog>
      <Form {...reviewForm}>
        <DialogTrigger asChild>
          <Button className="text-white py-5 rounded-sm font-bold">
            Leave a review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <DialogHeader>
              <DialogTitle className="hidden">Add Reviews</DialogTitle>
              <DialogDescription>
                Share your thoughts on this movie. Your review helps others
                decide what to watch!
              </DialogDescription>
            </DialogHeader>
            <FormField
              name="review"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">Review</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your review here."
                      className="focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="ratings"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">Ratings</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      required
                    >
                      <SelectTrigger className="w-full focus-visible:ring-0">
                        <SelectValue placeholder="Select a rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Ratings</SelectLabel>
                          {Array.from({ length: 5 }, (_, i) => {
                            const value = (i + 1).toString();
                            return (
                              <SelectItem key={value} value={value}>
                                {Array.from({ length: i + 1 }).map((_, j) => (
                                  <Star key={j} />
                                ))}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting || isLoading}
                  className={cn(
                    "text-white disabled:cursor-not-allowed disabled:pointer-events-auto disabled:hover:bg-primary"
                  )}
                >
                  Add review
                  {isSubmitting && <Loader2Icon className="animate-spin" />}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
