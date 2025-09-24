"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { MovieSectionsProps } from "@/lib/types";
import { useAuth } from "@/providers/firebase-auth-provider";
import MovieCard from "./resource-card";
import useFetchTMDBResource from "@/hooks/use-tmdb-fetch";
import WidthConstraint from "../ui/width-constraint";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function MovieSection({
  category,
  queryKey,
  seeAllLink,
  url,
}: MovieSectionsProps) {
  const { resource } = useFetchTMDBResource(queryKey, url);
  const { user } = useAuth();

  return (
    <WidthConstraint className="space-y-2">
      <div className="flex justify-between items-center text-primary font-bold mb-3 ">
        <h5 className="hover-underline tracking-wider">{category}</h5>
        <Link
          href={seeAllLink || ""}
          className="flex gap-x-1 items-center group"
        >
          <p className="hidden min-[400px]:block text-3xl"> See more</p>
          <ArrowRight size={18} className="group-hover:animate-bounce" />
        </Link>
      </div>
      <Carousel>
        <CarouselContent className="mx-auto">
          {resource?.map((movie, index) => {
            return (
              <CarouselItem
                className="basis-1/2 lg:basis-1/3 xl:basis-1/4 sm:px-4"
                key={index}
              >
                <MovieCard
                  title={movie.title! || movie.name!}
                  resourceID={movie.id}
                  mediaType={
                    movie.media_type
                      ? movie.media_type
                      : movie.title
                      ? "movie"
                      : "tv"
                  }
                  image={
                    movie.poster_path
                      ? "https://image.tmdb.org/t/p/original" +
                        movie.poster_path
                      : "/fallback.jpg"
                  }
                  imgAlt={movie.title ?? movie.name ?? "Unknown"}
                  resource={movie}
                  user={user}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex border-primary text-primary hover:bg-primary! hover:text-white!" />
        <CarouselNext className="hidden md:flex border-primary text-primary hover:bg-primary! hover:text-white!" />
      </Carousel>
    </WidthConstraint>
  );
}
