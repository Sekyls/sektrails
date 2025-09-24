import { useQuery } from "@tanstack/react-query";
import { getTMDBResource } from "@/api/tmdb-resources";
import { TMDBApiPaths, TMDBResourceWithExtras } from "@/lib/types";

export default function useFetchTMDBResourceWithExtras(
  queryKey: string | number,
  url: TMDBApiPaths,
  params?: object
) {
  const { data, isLoading, error } = useQuery<TMDBResourceWithExtras>({
    queryKey: [queryKey, url],
    queryFn: () => getTMDBResource<TMDBResourceWithExtras>(url, params),
  });

  return {
    data,
    isLoading,
    error,
  };
}
