import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getTMDBResource } from "@/api/tmdb-resources";
import { TMDBApiPaths, TMDBGroupResourceResponse } from "@/lib/types";
import Autoplay from "embla-carousel-autoplay";

export default function MoreForYou() {
  const { data } = useQuery<TMDBGroupResourceResponse>({
    queryKey: ["more-for-you"],
    queryFn: () =>
      getTMDBResource<TMDBGroupResourceResponse>(
        TMDBApiPaths.DiscoverMovie2025
      ),
  });

  let MovieCategoryList;

  if (data && data.results.length > 0) {
    MovieCategoryList = data.results;
  }
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="border-0 outline-0 ring-0 shadow-none p-0 m-0"
    >
      <CarouselContent>
        {MovieCategoryList?.map((movie, index) => {
          return (
            <CarouselItem key={index}>
              <Card className="border-0 relative p-0">
                <CardContent className="p-0">
                  <Image
                    height={1080}
                    width={1920}
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      movie.backdrop_path
                    }
                    alt={movie.title ?? movie.name ?? "Unknown"}
                    className="w-full rounded-2xl h-150"
                  />
                </CardContent>
                <CardFooter className="absolute bottom-20 flex-col justify-center items-center mx-auto px-20 font-black space-y-2">
                  <h3 className="text-center mx-auto text-primary">
                    {movie.title || movie.name}
                  </h3>
                  <p className="max-w-1/2 text-center mx-auto text-white backdrop-blur-xs rounded-2xl font-bold">
                    {movie.overview}
                  </p>
                </CardFooter>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="border-primary text-primary hover:bg-primary! hover:text-white!" />
      <CarouselNext className="border-primary text-primary hover:bg-primary! hover:text-white!" />
    </Carousel>
  );
}
