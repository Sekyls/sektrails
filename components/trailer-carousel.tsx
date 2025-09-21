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
  const [firstVideoReady, setFirstVideoReady] = useState<boolean>(false);
  const firstVideoReadyRef = useRef<boolean>(firstVideoReady);
  const listenersMap = useRef<
    Map<number, { onLoadStart: () => void; onLoadedData: () => void }>
  >(new Map());

  const handleVideoRef = useCallback(
    (video: HTMLVideoElement | null, index: number) => {
      console.log("handleVideoRef called for index", index, "with", video);

      const prevListeners = listenersMap.current.get(index);
      const prevVideo = trailerRefs.current[index];
      if (prevVideo && prevListeners) {
        prevVideo.removeEventListener("loadstart", prevListeners.onLoadStart);
        prevVideo.removeEventListener("loadeddata", prevListeners.onLoadedData);
        listenersMap.current.delete(index);
      }

      if (!video) {
        trailerRefs.current[index] = null;
        return;
      }

      trailerRefs.current[index] = video;

      const onLoadStart = () => {
        console.log(`Video ${index} is downloading`);
      };

      const onLoadedData = () => {
        console.log(`video ${index}: download complete`);
        console.log("LOADEDDATA fired for index", index);

        if (index === 0) {
          setFirstVideoReady(true);
        }
      };

      video.addEventListener("loadstart", onLoadStart);
      video.addEventListener("loadeddata", onLoadedData);
      listenersMap.current.set(index, { onLoadStart, onLoadedData });

      return () => {
        console.log("cleaning up listeners for index", index);
        video.removeEventListener("loadeddata", onLoadedData);
      };
    },
    []
  );

  useEffect(() => {
    firstVideoReadyRef.current = firstVideoReady;
  }, [firstVideoReady]);

  useEffect(() => {
    if (!api) return;

    const handlePlay = () => {
      if (!firstVideoReadyRef.current) return;

      const currentCarouselIndex = api.selectedScrollSnap();
      trailerRefs.current.forEach((video, index) => {
        if (!video) return;
        if (currentCarouselIndex === index) {
          const p = video.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    };

    api.on("select", handlePlay);

    handlePlay();

    return () => {
      api.off("select", handlePlay);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    if (!firstVideoReady) return;

    const current = api.selectedScrollSnap();
    trailerRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === current) {
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [firstVideoReady, api]);

  useEffect(() => {
    trailerRefs.current.forEach((video) => {
      if (video) {
        video.load();
      }
    });

    return () => {
      trailerRefs.current.forEach((video, index) => {
        const handlers = listenersMap.current.get(index);
        if (video && handlers) {
          video.removeEventListener("loadstart", handlers.onLoadStart);
          video.removeEventListener("loadeddata", handlers.onLoadedData);
        }
      });
      listenersMap.current.clear();
      trailerRefs.current = [];
    };
  }, []);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 50000 })]}
      className="w-full"
    >
      <CarouselContent className="w-full m-0">
        {TRAILERS.map((trailer, index) => (
          <CarouselItem key={`${trailer.path}-${index}`} className="w-full p-0">
            <Card className="rounded-none p-0 w-full border-0 outline-0 bg-background">
              <CardContent className="flex items-center justify-center w-full p-0 relative">
                {trailer?.path ? (
                  <video
                    className="w-full h-auto block relative -top-8 aspect-video"
                    src={trailer.path}
                    preload="auto"
                    playsInline
                    muted={isMuted}
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
