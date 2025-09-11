"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight, BookmarkPlus } from "lucide-react";
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
import { MovieCardProps, MovieSectionsProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MovieCard({ image, imgAlt, title }: MovieCardProps) {
  return (
    <Card
      className={cn(
        "max-w-2xs pt-3 pb-3 px-2 rounded-3xl gap-2 bg-primary text-white border-0 outline-0 font-medium hover:scale-95 dark:hover:scale-100 dark:hover:animate-pulse  transition-all duration-500 ease-in-out"
      )}
    >
      <CardContent className="p-0">
        <Image
          src={image}
          alt={imgAlt}
          className="rounded-2xl aspect-[2/3]"
          width={500}
          height={750}
        />
      </CardContent>
      <CardFooter className="flex justify-between px-1.5">
        <p className="truncate w-50">{title}</p>
        <BookmarkPlus />
      </CardFooter>
    </Card>
  );
}

export default function MovieSection({
  category,
  queryKey,
  seeAllLink,
  url,
}: MovieSectionsProps) {
  const { resource } = useFetchTMDBResource(queryKey, url);

  return (
    <WidthConstraint className="space-y-2">
      <div className="flex justify-between items-center text-primary font-bold">
        <h4>{category}</h4>
        <Link href={seeAllLink || ""} className="flex gap-x-1 items-center">
          <p className="text-3xl"> See all</p>
          <ArrowRight size={18} />
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
                  image={
                    movie.poster_path
                      ? "https://image.tmdb.org/t/p/original" +
                        movie.poster_path
                      : "/fallback.jpg"
                  }
                  imgAlt={movie?.title || movie.name}
                  title={movie?.title || movie.name}
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
