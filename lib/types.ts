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
  
  // Trending
  Trending = "/trending/all/week",
 

  // Discover
  DiscoverMovie = "/discover/movie",
  DiscoverTv = "/discover/tv",
  DiscoverMovie2025 = "/discover/movie?primary_release_year=2025&sort_by=popularity.desc",
}

export type MovieCardProps = {
  resourceID: number;
  title: string;
  mediaType: string;
  image: string;
  imgAlt: string;
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

export type TMDBGroupResourceListItem = {
  id: number;
  title?: string;
  name?: string;
  media_type?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type TMDBGroupResourceResponse = {
  page: number;
  results: TMDBGroupResourceListItem[];
  total_pages: number;
  total_results: number;
};

export type TMDBVideo = {
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
  name: string;
};

export type TMDBVideosResponse = {
  results: TMDBVideo[];
};

export type TMDBCast = {
  name: string;
  character: string;
  profile_path: string | null;
};

export type TMDBCreditsResponse = {
  cast: TMDBCast[];
};

export type TMDBRecommendation = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type?: "movie" | "tv";
};

export type TMDBRecommendationsResponse = {
  page: number;
  results: TMDBRecommendation[];
  total_pages: number;
  total_results: number;
};

export type TMDBSimilarResponse = TMDBRecommendationsResponse;

export type TMDBResourceWithExtras = {
  id: number;
  title?: string; // movies
  name?: string; // tv
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  genres: { id: number; name: string }[];
  original_language: string;
  status: string;
  adult?: boolean;
  vote_average: number;

  // movie-specific
  release_date?: string;
  runtime?: number;

  // tv-specific
  first_air_date?: string;
  last_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  last_episode_to_air?: {
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
  };

  // extras
  videos?: TMDBVideosResponse;
  credits?: TMDBCreditsResponse;
  recommendations?: TMDBRecommendationsResponse;
  similar?: TMDBSimilarResponse;
};
