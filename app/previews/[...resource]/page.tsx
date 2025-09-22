"use client";
import NavigationBar from "@/components/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import WidthConstraint from "@/components/ui/width-constraint";
import useFetchTMDBResourceWithExtras from "@/hooks/use-tmdb-fetch-with-extras";
import {
  FetchedReviewData,
  ReviewFormData,
  ReviewsProps,
  TMDBApiPaths,
  TMDBCreditsResponse,
  TMDBRecommendationsResponse,
  TMDBResourceWithExtras,
  TMDBSimilarResponse,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader2Icon, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/footer";
import { useAuth } from "@/providers/firebase-auth-provider";
import Bookmark from "@/components/add-bookmark";
import MovieCard from "@/components/resource-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { addReview, getReviews } from "@/lib/reviews";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ShareResource from "@/components/share-resource";
import WatchTrailer from "@/components/watch-trailer";

function ResourceData({ meta }: { meta: TMDBResourceWithExtras }) {
  const { user } = useAuth();
  const trailer = meta?.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  return (
    <section className="mb-20 overflow-x-hidden">
      <Card className={cn("p-0 overflow-x-hidden")}>
        <CardContent className="p-0 relative">
          <Image
            src={
              meta.backdrop_path
                ? "https://image.tmdb.org/t/p/original" + meta.backdrop_path
                : "/fallback.jpg"
            }
            alt={meta.name || "N/A"}
            className="aspect-[16/9] w-full"
            width={1280}
            height={720}
            priority
          />
          <WidthConstraint className="hidden sm:block absolute bottom-1/12 ml-60 space-y-5">
            <h1 className="text-primary font tracking-widest hover-underline">
              {meta.title}
            </h1>
            {trailer ? (
              <WatchTrailer videoKey={trailer.key} name={trailer.name} />
            ) : (
              <Button
                className="text-3xl px-2 font-dancingScript font-bold h-auto py-2"
                size="lg"
                disabled
              >
                No trailer available
              </Button>
            )}
          </WidthConstraint>
        </CardContent>
        <WidthConstraint>
          <CardFooter className="block space-y-5 px-0 sm:px-6">
            <article className="sm:hidden space-y-2">
              <h3 className="text-primary font-black tracking-wider">
                {meta.title}
              </h3>
              {trailer ? (
                <div className="grid grid-cols-[2fr_1fr]">
                  <WatchTrailer videoKey={trailer.key} name={trailer.name} />
                  <div className="flex gap-5 mt-2 justify-center text-primary sm:hidden">
                    <Bookmark resource={meta} user={user} />
                    <ShareResource
                      poster_path={meta.poster_path}
                      overview={meta.overview}
                      name={meta.name}
                      title={meta.title}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2">
                  <Button
                    className="w-full sm:w-fit text-xl sm:text-3xl px-2 font-dancingScript font-bold text-white py-2"
                    disabled
                  >
                    No trailer available
                  </Button>
                  <div className="flex gap-5 mt-2 justify-center sm:hidden">
                    <Bookmark resource={meta} user={user} />
                    <ShareResource
                      poster_path={meta.poster_path}
                      overview={meta.overview}
                      name={meta.name}
                      title={meta.title}
                    />
                  </div>
                </div>
              )}
            </article>
            <article className="flex justify-between">
              <div className="flex gap-2.5 flex-wrap sm:gap-x-5">
                <div className=" px-3 sm:w-30 flex text-lg items-center justify-center bg-primary rounded-md text-white font-black sm:text-2xl">
                  {meta.vote_average.toFixed(1)}
                </div>
                <div className="space-y-2 font-bold">
                  <p>
                    Status: <span className="text-primary">{meta.status}</span>
                  </p>
                  <p>
                    {meta.runtime ? (
                      <span>
                        Duration:{" "}
                        <span className="text-primary">
                          {meta.runtime} Minutes
                        </span>
                      </span>
                    ) : (
                      <span>
                        Number of Seasons:{" "}
                        <span className="text-primary">
                          {meta.number_of_seasons}
                        </span>
                      </span>
                    )}
                  </p>
                  <p>
                    {meta.release_date ? (
                      <span>
                        Release Date:{" "}
                        <span className="text-primary">
                          {meta.release_date}
                        </span>
                      </span>
                    ) : (
                      <span>
                        First Air Date:{" "}
                        <span className="text-primary">
                          {meta.first_air_date}
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex gap-x-5 items-center justify-end">
                <div className="flex gap-x-1 text-primary font-semibold items-center justify-center">
                  <p className="text-foreground">Bookmark</p>
                  <Bookmark resource={meta} user={user} />
                </div>
                <div className="flex gap-x-1 text-primary font-semibold items-center justify-center">
                  <p className="text-foreground">Share</p>
                  <ShareResource
                    poster_path={meta.poster_path}
                    overview={meta.overview}
                    name={meta.name}
                    title={meta.title}
                  />
                </div>
              </div>
            </article>
            <div className="font-bold leading-10 text-justify max-w-2xl mb-2 text-primary">
              Synopsis:{" "}
              <span className="italic text-foreground">{meta.overview}</span>
            </div>
          </CardFooter>
        </WidthConstraint>
      </Card>
    </section>
  );
}

function ResourceReviews({ mediaType, resourceID }: ReviewsProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<FetchedReviewData[]>([]);

  const reviewSchema = z
    .object({
      review: z
        .string()
        .min(4, "Your review must be at least 4 characters long")
        .max(200, "Your review must be at most 500 characters long"),
      ratings: z.string().min(1, "Please select a rating"),
    })
    .required();
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
  function onSubmit(values: z.infer<typeof reviewSchema>) {
    const reviewFormData = {
      mediaType,
      resourceID,
      userId: user?.uid,
      name: user?.displayName,
      profileImage: user?.photoURL,
      ...values,
    };
    toast.promise(
      (async () => {
        const result = await addReview(reviewFormData as ReviewFormData);

        if (result === false) {
          throw new Error("Error adding review");
        }
        return "Review added succesfully";
      })(),
      {
        loading: "",
        success: (message) => ({
          message: "Review addition successful",
          description: message,
          action: {
            label: "Success!",
            onClick: () => {},
          },
          classNames: { actionButton: "bg-green-700! text-white!" },
        }),
        error: () => ({
          message: "Review addition failed",
          description: "Log in to add reviews",
          action: {
            label: "Failed!",
            onClick: () => {},
          },
          classNames: { actionButton: "bg-red-700! text-white!" },
        }),
      }
    );
  }
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
                <CarouselItem className="basis-1/4" key={index}>
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
                                    {Array.from({ length: i + 1 }).map(
                                      (_, j) => (
                                        <Star key={j} />
                                      )
                                    )}
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
      </article>
    </section>
  );
}

function ResourceCasts({ credits }: { credits: TMDBCreditsResponse }) {
  return (
    <section className="text-center">
      <h3 className="font-dancingScript! font-bold pb-2">Movie Casts</h3>
      <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
        {credits.cast.map((cast, index) => {
          return (
            <Card className={cn("border-0 p-0")} key={index}>
              <CardContent className="p-0">
                <Image
                  src={
                    cast.profile_path
                      ? "https://image.tmdb.org/t/p/original" +
                        cast.profile_path
                      : "/fallback.jpg"
                  }
                  alt={cast.name || "N/A"}
                  className="aspect-[2/3] rounded-2xl"
                  width={500}
                  height={750}
                />
              </CardContent>
              <CardFooter className="grid grid-cols-3 text-center font-semibold pl-0 pb-2 pr-1">
                <p>{cast.name}</p>
                <p className="text-primary font-bold">As</p>
                <p>{cast.character}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <Carousel className="md:hidden">
        <CarouselContent>
          {credits.cast.map((cast, index) => {
            return (
              <CarouselItem key={index} className="max-w-2xs">
                <Card className={cn("border-0 p-0 max-w-2xs h-full")}>
                  <CardContent className="p-0">
                    <Image
                      src={
                        cast.profile_path
                          ? "https://image.tmdb.org/t/p/original" +
                            cast.profile_path
                          : "/fallback.jpg"
                      }
                      alt={cast.name || "N/A"}
                      className="aspect-[2/3] rounded-2xl"
                      width={500}
                      height={750}
                    />
                  </CardContent>
                  <CardFooter className="grid grid-cols-3 text-center font-semibold pl-0 pb-2 pr-1">
                    <p>{cast.name}</p>
                    <p className="text-primary font-bold">As</p>
                    <p>{cast.character}</p>
                  </CardFooter>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

function SimilarMovies({ similar }: { similar: TMDBSimilarResponse }) {
  const { user } = useAuth();
  return (
    <section>
      <h3 className="font-dancingScript! font-bold mb-5 md:pb-2 text-center">
        Similar Movies For You
      </h3>
      <div className="grid grid-cols-2 gap-x-2 sm:gap-x-10 min-[970px]:grid-cols-3 min-[1320px]:grid-cols-4 gap-y-10">
        {similar.results.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              image={
                movie.poster_path
                  ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                  : "/fallback.jpg"
              }
              imgAlt={movie.name || movie.title || "N/A"}
              title={movie.name || movie.title || "N/A"}
              mediaType={movie.title ? "movie" : "tv"}
              resourceID={movie.id}
              resource={movie}
              user={user}
            />
          );
        })}
      </div>
    </section>
  );
}

function RecommendedMovies({
  recommendations,
}: {
  recommendations: TMDBRecommendationsResponse;
}) {
  const { user } = useAuth();
  return (
    <section>
      <h3 className="font-dancingScript! font-bold mb-5 md:pb-2 text-center">
        Recommended Movies For You
      </h3>
      <div className="grid grid-cols-2 gap-x-2 sm:gap-x-10 min-[970px]:grid-cols-3 min-[1320px]:grid-cols-4 gap-y-10">
        {recommendations.results.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              image={
                movie.poster_path
                  ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                  : "/fallback.jpg"
              }
              imgAlt={movie.name || movie.title || "N/A"}
              title={movie.name || movie.title || "N/A"}
              mediaType={movie.title ? "movie" : "tv"}
              resourceID={movie.id}
              resource={movie}
              user={user}
            />
          );
        })}
      </div>
    </section>
  );
}

export default function ResourcePage() {
  const { resource } = useParams<{ resource: string[] }>();
  const [mediaType, ID] = resource;
  const { data, error } = useFetchTMDBResourceWithExtras(
    ID,
    `/${mediaType}/${ID}` as TMDBApiPaths,
    { append_to_response: "videos,credits,recommendations,similar" }
  );

  if (!resource || resource.length < 2) {
    return <p>Invalid resource path</p>;
  }

  if (!data) {
    return <p>{error?.message}</p>;
  }
  const { credits, similar, recommendations, ...meta } = data!;
  return (
    <div className="overflow-x-hidden">
      <header>
        <NavigationBar />
      </header>
      <ResourceData meta={meta} />
      <main>
        <WidthConstraint className="space-y-20">
          <ResourceReviews
            resourceID={meta.id}
            mediaType={meta.title ? "movie" : "tv"}
          />
          <ResourceCasts credits={credits!} />
          <SimilarMovies similar={similar!} />
          <RecommendedMovies recommendations={recommendations!} />
        </WidthConstraint>
      </main>
      <footer className="w-full mt-45 space-y-10 pb-8 bg-primary text-white pt-10">
        <Footer />
      </footer>
    </div>
  );
}
