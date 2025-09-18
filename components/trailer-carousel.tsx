"use client";
import * as React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import { TRAILERS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Volume2, VolumeOff } from "lucide-react";

export default function TrailersCarousel() {
  const trailerRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(
    new Array(TRAILERS.length).fill(false)
  );

  // Initialize refs and loaded state on mount
  useEffect(() => {
    trailerRefs.current = new Array(TRAILERS.length).fill(null);
    setVideosLoaded(new Array(TRAILERS.length).fill(false));

    return () => {
      // Cleanup on unmount
      trailerRefs.current.forEach((video) => {
        if (!video) return;
        video.pause();
        video.removeAttribute("src"); // clear video
        video.load(); // reset element
      });
    };
  }, []);

  // Handle attaching video refs and setting loaded state
  const handleVideoRef = useCallback(
    (video: HTMLVideoElement | null, index: number) => {
      if (!video) return;

      trailerRefs.current[index] = video;

      const handleLoadedData = () => {
        setVideosLoaded((prev) => {
          if (!prev[index]) {
            const copy = [...prev];
            copy[index] = true;
            return copy;
          }
          return prev;
        });
      };

      const handleLoadStart = () => {
        setVideosLoaded((prev) => {
          if (prev[index]) {
            const copy = [...prev];
            copy[index] = false;
            return copy;
          }
          return prev;
        });
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("loadstart", handleLoadStart);

      // Handle cached videos (back navigation)
      if (video.readyState >= 2) {
        handleLoadedData();
      }

      // Cleanup listeners when component unmounts
      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("loadstart", handleLoadStart);
      };
    },
    []
  );

  // Play the current slide only
  const handlePlay = useCallback(() => {
    if (!api) return;

    const currentIndex = api.selectedScrollSnap();

    trailerRefs.current.forEach((trailer, i) => {
      if (!trailer) return;

      if (currentIndex === i && videosLoaded[i]) {
        trailer.play().catch(() => {});
      } else {
        trailer.pause();
        trailer.currentTime = 0;
      }
    });
  }, [api, videosLoaded]);

  // Run handlePlay when carousel changes
useEffect(() => {
  if (!api) return;

  handlePlay(); // play initial slide
  api.on("select", handlePlay);

  // Cleanup function
  return () => {
    api.off("select", handlePlay); // wrapped in void-returning function
  };
}, [api, handlePlay]);


  // Mute/unmute videos
  useEffect(() => {
    trailerRefs.current.forEach((video) => {
      if (video) video.muted = isMuted;
    });
  }, [isMuted]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 60000 })]}
      className="w-full"
    >
      <CarouselContent className="w-full m-0">
        {TRAILERS.map((trailer, index) => (
          <CarouselItem key={`${trailer.path}-${index}`} className="w-full p-0">
            <Card className="rounded-none p-0 w-full border-0 outline-0 bg-background">
              <CardContent className="flex items-center justify-center w-full p-0 relative">
                {trailer?.path ? (
                  <video
                    className="w-full h-auto block relative -top-8"
                    src={trailer.path}
                    muted={isMuted}
                    preload="metadata"
                    playsInline
                    ref={(video) => handleVideoRef(video, index)}
                  />
                ) : (
                  <div className="w-full h-[400px] flex items-center justify-center bg-black text-white">
                    Missing trailer
                  </div>
                )}
                <figcaption className="absolute bottom-1/12 lg:bottom-1/6 text-center">
                  <h3 className="text-primary">{trailer.title}</h3>
                  <p className="max-w-xl text-white font-bold">
                    {trailer.description}
                  </p>
                </figcaption>
                <div className="bg-background h-4 w-full absolute bottom-8 lg:bottom-7 lg:h-6"></div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex bg-primary! ml-10 border-0 sm:size-10 hover:bg-primary/50 hover:text-white hover:scale-105 z-50 left-0" />
      <CarouselNext className="hidden sm:flex bg-primary! mr-10 border-0 sm:size-10 hover:bg-primary/50 hover:text-white hover:scale-105 z-50 right-0" />
      <Button
        size={"icon"}
        onClick={() => setIsMuted(!isMuted)}
        className="absolute text-white size-8 sm:size-10 rounded-full bottom-1/6 right-0 mr-10 bg-transparent border-primary border backdrop-blur-2xl focus:ring-0"
      >
        {isMuted ? <VolumeOff /> : <Volume2 />}
      </Button>
    </Carousel>
  );
}
