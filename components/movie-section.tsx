"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";
import WidthConstraint from "./ui/width-constraint";
import useFetchTMDBResource from "../hooks/use-tmdb-fetch";
import { MovieSectionsProps } from "@/lib/types";
import { useAuth } from "@/providers/firebase-auth-provider";
import MovieCard from "./resource-card";

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
      <div className="flex justify-between items-center text-primary font-bold ">
        <h4 className="hover-underline mb-2">{category}</h4>
        <Link
          href={seeAllLink || ""}
          className="flex gap-x-1 items-center group"
        >
          <p className="text-3xl"> See more</p>
          <ArrowRight size={18} className="group-hover:animate-bounce" />
        </Link>
      </div>
      <Carousel>
        <CarouselContent>
          {resource?.map((movie, index) => {
            return (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/5 px-4"
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
        <CarouselPrevious className="border-primary text-primary hover:bg-primary! hover:text-white!" />
        <CarouselNext className="border-primary text-primary hover:bg-primary! hover:text-white!" />
      </Carousel>
    </WidthConstraint>
  );
}
