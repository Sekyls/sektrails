import { TMDBCreditsResponse } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";


export default function ResourceCasts({ credits }: { credits: TMDBCreditsResponse }) {
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
