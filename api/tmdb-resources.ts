import { TMDBApiPaths } from "@/lib/types";
import { tmdbAxiosInstance } from "./axios";

export async function getTMDBResource<T>(resource: TMDBApiPaths): Promise<T> {
  const response = await tmdbAxiosInstance<T>(resource);
  return response.data;
}
