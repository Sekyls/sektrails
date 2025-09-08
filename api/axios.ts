import axios from "axios";
const token = process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN;

export const tmdbAxiosInstance = axios.create({
  method: "GET",
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
