"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";
import useFetchTMDBResource from "@/hooks/use-tmdb-fetch";
import { TMDBApiPaths, TMDBGroupResourceListItem } from "@/lib/types";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "@/providers/firebase-auth-provider";
import MovieCard from "@/components/resource-card";

export default function CategoriesPage() {
  const { user } = useAuth();
  const params = useParams();
  const pathname = usePathname();
  const resourceUrl = pathname.split("/specialties")[1] as TMDBApiPaths;
  const refparam = params["categories"];

  const queryKey = refparam?.[1];

  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<TMDBGroupResourceListItem[]>([]);

  const { resource, isLoading, totalPages } = useFetchTMDBResource(
    queryKey,
    resourceUrl,
    page,
    { page: page }
  );

  useEffect(() => {
    if (resource && resource.length > 0) {
      setAllMovies((prev) => [...prev, ...resource]);
    }
  }, [resource]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading && page < (totalPages || 999)) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [isLoading, page, totalPages]);

  return (
    <>
      <section className="grid grid-cols-2 gap-x-2 sm:gap-x-10 min-[970px]:grid-cols-3 min-[1320px]:grid-cols-4 min-[1700px]:grid-cols-5 gap-y-10 mx-2.5 mt-4 min-[640px]:mx-auto">
        {allMovies.map((movie: TMDBGroupResourceListItem, index) => (
          <MovieCard
            resourceID={movie.id}
            mediaType={
              movie.media_type ? movie.media_type : movie.title ? "movie" : "tv"
            }
            title={movie.title || movie.name || ""}
            image={
              movie.poster_path
                ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                : "/fallback.jpg"
            }
            imgAlt={movie.title || movie.name || ""}
            key={index}
            resource={movie}
            user={user}
          />
        ))}
      </section>
      <div ref={loadMoreRef} className="h-12 flex items-center justify-center">
        {isLoading && <Loader2Icon className="animate-spin text-primary" />}
        {page >= (totalPages || 999) && <p className="text-primary">Loading</p>}
      </div>
    </>
  );
}
