import { useQuery } from "@tanstack/react-query";
import { getTMDBResource } from "@/api/tmdb-resources";
import { TMDBApiPaths, TMDBMovieResponse } from "@/lib/types";

export default function useFetchTMDBResource(
  queryKey: string | number,
  url: TMDBApiPaths
) {
  const { data, isLoading, error } = useQuery<TMDBMovieResponse>({
    queryKey: [queryKey, url],
    queryFn: () => getTMDBResource<TMDBMovieResponse>(url),
  });

  return {
    resource: data?.results ?? [],
    page: data?.page ?? 1,
    totalPages: data?.total_pages ?? 1,
    totalResults: data?.total_results ?? 0,
    isLoading,
    error,
  };
}
