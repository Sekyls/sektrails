import { useQuery } from "@tanstack/react-query";
import { getTMDBResource } from "@/api/tmdb-resources";
import { TMDBApiPaths, TMDBGroupResourceResponse } from "@/lib/types";

export default function useFetchTMDBResource(
  queryKey: string | number | null,
  url: TMDBApiPaths,
  page?: string | number,
  params?: object
) {
  const { data, isLoading, error } = useQuery<TMDBGroupResourceResponse>({
    queryKey: [queryKey, url, page],
    queryFn: () => getTMDBResource<TMDBGroupResourceResponse>(url, params),
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
