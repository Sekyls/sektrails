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
  TMDBApiPaths,
  TMDBCreditsResponse,
  TMDBRecommendationsResponse,
  TMDBResourceWithExtras,
  TMDBSimilarResponse,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { Loader2Icon, Share, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
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
import { isValid } from "zod/v3";

function ResourceData({ meta }: { meta: TMDBResourceWithExtras }) {
  const { user } = useAuth();
  return (
    <section className="mb-20">
      <Card className={cn("p-0")}>
        <CardContent className="p-0 relative">
          <Image
            src={
              meta.backdrop_path
                ? "https://image.tmdb.org/t/p/original" + meta.backdrop_path
                : "/fallback.jpg"
            }
            alt={meta.name!}
            className="aspect-[16/9] w-full"
            width={1280}
            height={720}
          />
          <WidthConstraint className="absolute bottom-1/12 ml-60 space-y-5">
            <h1 className="text-primary font tracking-widest hover-underline">
              {meta.title}
            </h1>
            <Button
              className="text-2xl font-dancingScript font-bold"
              size={"lg"}
            >
              Watch Trailer
            </Button>
          </WidthConstraint>
        </CardContent>
        <WidthConstraint>
          <CardFooter className="block space-y-5">
            <article className="flex justify-between">
              <div className="flex gap-x-5">
                <div className="w-30 flex items-center justify-center bg-primary rounded-md text-white font-black text-2xl">
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
              <div className="flex gap-x-5 items-center justify-end">
                <div className="flex gap-x-1 text-primary font-semibold items-center justify-center">
                  <p className="text-foreground">Bookmark</p>
                  <Bookmark resource={meta} user={user} />
                </div>
                <div className="flex gap-x-1 text-primary font-semibold items-center justify-center">
                  <p className="text-foreground">Share</p>
                  <Share />
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

function ResourceReviews() {
  const { user } = useAuth();
  const reviewSchema = z
    .object({
      review: z
        .string()
        .min(4, "Your review must be at least 4 characters long")
        .max(200, "Your review must be at most 500 characters long"),
      ratings: z.string(),
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
  const { isLoading, isSubmitting, validatingFields, isValid } = formState;
  function onSubmit(values: z.infer<typeof reviewSchema>) {
    const reviewFormData = {
      id: user?.uid,
      name: user?.displayName,
      profileImage: user?.photoURL,
      ...values,
    };

    console.log(reviewFormData);
  }

  return (
    <section className="text-center">
      <h3 className="font-dancingScript! font-bold pb-2">Movie Reviews</h3>
      <article>
        <div className="grid grid-cols-5">
          <Card className="max-w-sm p-2 space-y-2.5 block rounded-md">
            <div className="flex items-center gap-x-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle className="text-left">
                {"Dennis Sekyi Opoku"}
              </CardTitle>
            </div>
            <CardDescription className="text-left tracking-wide text-pretty">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In
              molestias asperiores neque ratione et, ducimus recusandae impedit
              provident sapiente eum, animi maxime hic quia quis ipsum adipisci
              eligendi, dolor repudiandae.
            </CardDescription>
          </Card>
        </div>
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
                          className="focus-visible:ring-0 "
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
                        >
                          <SelectTrigger className="w-full">
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
      <div className="grid grid-cols-4 gap-x-5 gap-y-10">
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
                  alt={cast.name || ""}
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
    </section>
  );
}

function SimilarMovies({ similar }: { similar: TMDBSimilarResponse }) {
  const { user } = useAuth();
  return (
    <section>
      <h3 className="font-dancingScript! font-bold pb-2 text-center">
        Similar Movies For You
      </h3>
      <div className="grid grid-cols-5 gap-y-10">
        {similar.results.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              image={
                movie.poster_path
                  ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                  : "/fallback.jpg"
              }
              imgAlt={movie.name || movie.title || ""}
              title={movie.name || movie.title || ""}
              mediaType={movie.media_type!}
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
      <h3 className="font-dancingScript! font-bold pb-2 text-center">
        Recommended Movies For You
      </h3>
      <div className="grid grid-cols-5 space-y-10">
        {recommendations.results.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              image={
                movie.poster_path
                  ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                  : "/fallback.jpg"
              }
              imgAlt={movie.name || movie.title || ""}
              title={movie.name || movie.title || ""}
              mediaType={movie.media_type!}
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
  if (!resource || resource.length < 2) {
    return <p>Invalid resource path</p>;
  }
  const { data, error } = useFetchTMDBResourceWithExtras(
    ID,
    `/${mediaType}/${ID}` as TMDBApiPaths,
    { append_to_response: "videos,credits,recommendations,similar" }
  );
  if (!data) {
    return <p>{error?.message}</p>;
  }
  const { credits, similar, recommendations, ...meta } = data!;
  return (
    <>
      <header>
        <NavigationBar />
      </header>
      <ResourceData meta={meta} />
      <main>
        <WidthConstraint className="space-y-20">
          <ResourceReviews />
          <ResourceCasts credits={credits!} />
          <SimilarMovies similar={similar!} />
          <RecommendedMovies recommendations={recommendations!} />
        </WidthConstraint>
      </main>
      <footer className="w-full mt-45 space-y-10 pb-8 bg-primary text-white pt-10">
        <Footer />
      </footer>
    </>
  );
}
