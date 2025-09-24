"use client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { FetchedReviewData, ReviewsProps } from "@/lib/types";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getReviews } from "@/lib/reviews";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import ReviewForm from "./review-form";

export default function ResourceReviews({
  mediaType,
  resourceID,
}: ReviewsProps) {
  const [reviews, setReviews] = useState<FetchedReviewData[]>([]);

  useEffect(() => {
    const unsubscribe = getReviews(
      mediaType,
      resourceID.toString(),
      setReviews
    );

    return () => unsubscribe();
  }, [mediaType, resourceID]);

  return (
    <section className="text-center">
      <h3 className="font-dancingScript! font-bold pb-2">Movie Reviews</h3>
      <article className="space-y-10">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent>
            {reviews.map((review, index) => {
              return (
                <CarouselItem
                  className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  key={index}
                >
                  <Card className="max-w-sm p-2 space-y-2.5 block rounded-md bg-primary/80 text-white dark:bg-transparent">
                    <div className="flex items-center gap-x-5">
                      <Avatar>
                        <AvatarImage src={review.profileImage} alt="avatar" />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-left">{review.name}</CardTitle>
                    </div>
                    <CardDescription className="text-left tracking-wide text-pretty space-y-1 text-white dark:text-white/50">
                      <span className="flex gap-x-0.5">
                        {Array.from(
                          { length: parseInt(review.ratings) },
                          (_, index) => {
                            return (
                              <Star
                                key={index}
                                size={16}
                                className="text-black fill-white dark:fill-transparent dark:text-primary"
                              />
                            );
                          }
                        )}
                      </span>
                      <p>{review.review}</p>
                    </CardDescription>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        {reviews.length < 1 && (
          <h4 className="tracking-widest">No Reviews Yet</h4>
        )}
        <ReviewForm mediaType={mediaType} resourceID={resourceID} />
      </article>
    </section>
  );
}
