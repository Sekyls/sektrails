"use client";
import React, { useState, useEffect } from "react";
import useFetchTMDBResource from "@/hooks/use-tmdb-fetch";
import { TMDBApiPaths, TMDBGroupResourceListItem } from "@/lib/types";
import { useAuth } from "@/providers/firebase-auth-provider";
import { useSearchParams } from "next/navigation";
import SentinelObserver from "@/components/observers/paging-observer";
import MovieCard from "./resource-card";

export default function SearchContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<TMDBGroupResourceListItem[]>([]);
  const search = searchParams.get("query");
  const resourceUrl = `search/multi?query=${
    !search ? "A" : search
  }` as TMDBApiPaths;

  const { resource, isLoading, totalPages } = useFetchTMDBResource(
    !search ? "A" : search,
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

  useEffect(() => {
    setAllMovies([]);
    setPage(1);
  }, [search]);

  return (
    <>
      <section className="grid grid-cols-2 gap-x-2 sm:gap-x-10 min-[970px]:grid-cols-3 min-[1320px]:grid-cols-4 gap-y-10 mx-2.5 mt-4 min-[640px]:mx-auto min-[1700px]:grid-cols-5">
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
      <SentinelObserver
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  );
}
