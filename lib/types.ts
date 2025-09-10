import { Icon } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

export type MobileToggleProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type WidthConstraintProps = {
  className?: string;
  children?: React.ReactNode;
};

export enum TMDBApiPaths {
  // Movies
  MoviePopular = "/movie/popular",
  MovieTopRated = "/movie/top_rated",
  MovieUpcoming = "/movie/upcoming",
  MovieNowPlaying = "/movie/now_playing",

  // TV
  TvPopular = "/tv/popular",
  TvTopRated = "/tv/top_rated",
  TvOnTheAir = "/tv/on_the_air",
  TvAiringToday = "/tv/airing_today",

  // People
  PersonPopular = "/person/popular",

  // Trending
  Trending = "/trending/all/week",

  // Genres
  GenreMovieList = "/genre/movie/list",
  GenreTvList = "/genre/tv/list",

  // Discover
  DiscoverMovie = "/discover/movie",
  DiscoverTv = "/discover/tv",
  DiscoverMovie2025 = "/discover/movie?primary_release_year=2025&sort_by=popularity.desc",
}

export type TMDBMovie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
};

export type TMDBMovieResponse = {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
};

export type TMDBPerson = {
  id: number;
  name: string;
  popularity: number;
  profile_path: string | null;
  known_for_department: string;
  gender: number;
  known_for: TMDBMovie[];
};

export type TMDBPersonResponse = {
  page: number;
  results: TMDBPerson[];
  total_pages: number;
  total_results: number;
};

export type TMDBTrendingItem =
  | (TMDBMovie & { media_type: "movie" })
  | (TMDBMovie & { media_type: "tv" })
  | (TMDBPerson & { media_type: "person" });

export type TMDBTrendingResponse = {
  page: number;
  results: TMDBTrendingItem[];
  total_pages: number;
  total_results: number;
};

export type TMDBGenre = {
  id: number;
  name: string;
};

export type TMDBGenreListResponse = {
  genres: TMDBGenre[];
};

export type MovieCardProps = {
  image: string;
  imgAlt: string;
  title: string;
};

export type MovieSectionsProps = {
  category: string;
  seeAllLink: string;
  queryKey: string;
  url: TMDBApiPaths;
};

type SubCategory = {
  title: string;
  url: string;
  icon: Icon;
};

type Category = {
  categoryName: string;
  subCategories: SubCategory[];
};

export type SideBarCategoriesProps = Array<{
  category: Category;
}>;
