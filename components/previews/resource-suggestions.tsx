"use client";
import { TMDBResourceSuggestionsResponse } from "@/lib/types";
import { useAuth } from "@/providers/firebase-auth-provider";
import MovieCard from "../miscellaneous/resource-card";

export default function ResourceSuggestions({
  suggestion,
}: {
  suggestion: TMDBResourceSuggestionsResponse;
}) {
  const { user } = useAuth();
  return (
    <section>
      <h3 className="font-dancingScript! font-bold mb-5 md:pb-2 text-center">
        Similar Movies For You
      </h3>
      <div className="grid grid-cols-2 gap-x-2 sm:gap-x-10 min-[970px]:grid-cols-3 min-[1320px]:grid-cols-4 gap-y-10 min-[1700px]:grid-cols-5">
        {suggestion.results.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              image={
                movie.poster_path
                  ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                  : "/fallback.jpg"
              }
              imgAlt={movie.name || movie.title || "N/A"}
              title={movie.name || movie.title || "N/A"}
              mediaType={movie.title ? "movie" : "tv"}
              resourceID={movie.id}
              resource={movie}
              user={user}
            />
          );
        })}
      </div>
    </section>
  );
}
