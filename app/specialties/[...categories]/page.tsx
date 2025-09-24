"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";
import useFetchTMDBResource from "@/hooks/use-tmdb-fetch";
import { TMDBApiPaths, TMDBGroupResourceListItem } from "@/lib/types";
import { useAuth } from "@/providers/firebase-auth-provider";
import SentinelObserver from "@/components/observers/paging-observer";
import MovieCard from "@/components/miscellaneous/resource-card";

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
      <SentinelObserver
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  );
}
