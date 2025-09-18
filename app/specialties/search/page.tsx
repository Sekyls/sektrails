"use client";
import React, { useState, useEffect, useRef } from "react";
import useFetchTMDBResource from "@/hooks/use-tmdb-fetch";
import { TMDBApiPaths, TMDBGroupResourceListItem } from "@/lib/types";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "@/providers/firebase-auth-provider";
import MovieCard from "@/components/resource-card";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const search = searchParams.get("query");
  const resourceUrl = `search/multi?query=${search}` as TMDBApiPaths;

  const { resource, isLoading, totalPages } = useFetchTMDBResource(
    search,
    resourceUrl,
    page,
    { page: page }
  );

  useEffect(() => {
    if (resource && resource.length > 0) {
      const filteredresource = resource.filter((item) => {
        return item.media_type === "movie" || item.media_type === "tv";
      });
      setAllMovies((prev) => [...prev, ...filteredresource]);
    }
  }, [resource]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading && page < (totalPages || 999)) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isLoading, page, totalPages]);

  useEffect(() => {
    setAllMovies([]);
    setPage(1);
  }, [search]);

  return (
    <>
      <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-y-10 gap-x-5 m-10">
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
