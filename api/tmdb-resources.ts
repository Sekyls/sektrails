import { TMDBApiPaths } from "@/lib/types";
import { tmdbAxiosInstance } from "./axios";

export async function getTMDBResource<T>(
  resourceUrl: TMDBApiPaths,
  params?: object
): Promise<T> {
  const response = await tmdbAxiosInstance.get<T>(resourceUrl, { params: params });
  return response.data;
}
