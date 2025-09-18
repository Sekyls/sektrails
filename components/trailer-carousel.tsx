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

  // Reset refs array and cleanup when component mounts/unmounts
  useEffect(() => {
    trailerRefs.current = new Array(TRAILERS.length).fill(null);
    setVideosLoaded(new Array(TRAILERS.length).fill(false));

    // Cleanup function
    return () => {
      trailerRefs.current.forEach((video) => {
        if (video) {
          video.pause();
          video.removeEventListener("loadeddata", () => {});
          video.removeEventListener("loadstart", () => {});
        }
      });
    };
  }, [TRAILERS.length]);

  const handleVideoRef = useCallback(
    (video: HTMLVideoElement | null, index: number) => {
      if (video && trailerRefs.current[index] !== video) {
        trailerRefs.current[index] = video;

        // Add event listeners for video loading
        const handleLoadedData = () => {
          setVideosLoaded((prev) => {
            if (prev[index] !== true) {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            }
            return prev;
          });
        };

        const handleLoadStart = () => {
          setVideosLoaded((prev) => {
            if (prev[index] !== false) {
              const newLoaded = [...prev];
              newLoaded[index] = false;
              return newLoaded;
            }
            return prev;
          });
        };

        // Remove any existing listeners first
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("loadstart", handleLoadStart);

        // Add new listeners
        video.addEventListener("loadeddata", handleLoadedData);
        video.addEventListener("loadstart", handleLoadStart);

        // Check if video is already ready
        if (video.readyState >= 2) {
          setTimeout(() => handleLoadedData(), 0);
        }
      }
    },
    []
  );

  const handlePlay = useCallback(() => {
    if (!api) {
      return;
    }

    const currentSlideIndex = api.selectedScrollSnap();

    trailerRefs.current.forEach((trailer, trailerIndex) => {
      if (!trailer) {
        return;
      }

      if (currentSlideIndex === trailerIndex && videosLoaded[trailerIndex]) {
        // Small delay to ensure video is ready
        setTimeout(() => {
          trailer.play().catch((error) => {
            console.log("Video play failed:", error);
          });
        }, 100);
      } else {
        trailer.pause();
        trailer.currentTime = 0;
      }
    });
  }, [api, videosLoaded]);

  useEffect(() => {
    if (!api) return;

    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      handlePlay();
    }, 100);

    // Listen for slide changes
    api.on("select", handlePlay);

    return () => {
      clearTimeout(timer);
      api.off("select", handlePlay);
    };
  }, [api, handlePlay]);

  // Additional effect to handle initial play with delay on mount
  useEffect(() => {
    if (api) {
      const mountTimer = setTimeout(() => {
        handlePlay();
      }, 200);

      return () => clearTimeout(mountTimer);
    }
  }, [api, handlePlay]);

  // Handle mute state changes
  useEffect(() => {
    trailerRefs.current.forEach((trailer) => {
      if (trailer) {
        trailer.muted = isMuted;
      }
    });
  }, [isMuted]);

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 60000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="w-full m-0">
          {TRAILERS.map((trailer, index) => (
            <CarouselItem
              key={`${trailer.path}-${index}`}
              className="w-full p-0"
            >
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
                      key={`${trailer.path}-${index}`}
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
                  <div className=" bg-background h-4 w-full absolute bottom-8 lg:bottom-7 lg:h-6"></div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex bg-primary! ml-10 border-0 sm:size-10 hover:bg-primary/50 hover:text-white hover:scale-105 z-50 left-0" />
        <CarouselNext className="hidden sm:flex bg-primary! mr-10 border-0 sm:size-10 hover:bg-primary/50 hover:text-white hover:scale-105 z-50 right-0" />
        <Button
          size={"icon"}
          onClick={() => {
            setIsMuted(!isMuted);
          }}
          className="absolute text-white size-8 sm:size-10 rounded-full bottom-1/6 right-0 mr-10 bg-transparent border-primary border backdrop-blur-2xl focus:ring-0 focus-visible:ring-0 focus-within:ring-0"
        >
          {isMuted ? <VolumeOff /> : <Volume2 />}
        </Button>
      </Carousel>
    </>
  );
}
