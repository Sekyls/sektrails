"use client";
import { MovieCard } from "@/components/movie-section";
import NavigationBar from "@/components/navigation-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { BookmarkPlus, Share } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/footer";

function ResourceData({ meta }: { meta: TMDBResourceWithExtras }) {
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
                <Button
                  size={"lg"}
                  className="text-base font-semibold py-6 px-3 rounded-sm"
                >
                  Leave a review
                </Button>
                <div className="flex gap-x-1 text-primary font-semibold items-center justify-center">
                  <p className="text-foreground">Bookmark</p>
                  <BookmarkPlus />
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
  return (
    <section className="text-center">
      <h3 className="font-dancingScript! font-bold pb-2">Movie Reviews</h3>
      <div className="w-full bg-primary/80 min-h-140 rounded-md flex flex-col items-center justify-center space-y-10">
        <div className="text-white text-3xl">{"No Reviews Yet"}</div>
        <Button
          size={"lg"}
          className="py-6 font-black bg-background text-primary hover:bg-background/60"
        >
          Leave a review
        </Button>
      </div>
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
                  alt={""}
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
