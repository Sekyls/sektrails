import axios from "axios";
const tmdbApiToken = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;

export const tmdbAxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tmdbApiToken}`,
  },
  params: {
    language: "en-US",
  },
});


