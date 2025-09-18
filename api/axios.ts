import axios from "axios";
const tmdbApiToken = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;
const tinyUrlApiToken = process.env.NEXT_PUBLIC_TINY_URL_API_TOKEN;

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

export const tinyUrlInstance = axios.create({
  url: `https://api.tinyurl.com/create?api_token=${tinyUrlApiToken}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tinyUrlApiToken}`,
  },
  method: "POST",
  data: {
    domain: "tinyurl.com",
    alias: "sektrail",
    description: "string",
  },
});
