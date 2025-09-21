import { Icon } from "@tabler/icons-react";
import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export type MobileToggleProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type AvatarUser = {
  user: {
    photoURL?: string | null;
    displayName?: string | null;
    email: string | null;
    phoneNumber: string | null;
    uid: string | null;
  } | null;
  loading?: boolean;
};

export type NavProps = MobileToggleProps & AvatarUser;

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
  title: string | undefined;
  mediaType: string | undefined;
  image: string;
  imgAlt: string;
  bookmarked?: boolean;
};

export type AddBookmark = {
  className?: string;
  user: User | null;
  resource:
    | TMDBGroupResourceListItem
    | TMDBResourceWithExtras
    | TMDBRecommendation;
};

export type BookmarkResource = MovieCardProps & AddBookmark;

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
  media_type?: string | undefined;
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
  id?: string;
  key?: string;
  site?: string;
  type?: string;
  official?: boolean;
  name?: string;
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
  poster_path: string;
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

export type ReviewFormData = {
  name: string;
  profileImage: string;
  ratings: string;
  review: string;
  mediaType: "movie" | "tv";
  resourceID: number;
};

export type ReviewsProps = {
  mediaType: "movie" | "tv";
  resourceID: number;
};

export type FetchedReviewData = {
  id: string;
  userId: string;
  name: string;
  profileImage?: string;
  review: string;
  ratings: string;
  addedAt?: Date;
};

export type TinyUrlResponse = {
  data: {
    tiny_url: string;
    url: string;
  };
  code: number;
  errors: [];
};

export type ShareResourceProps = {
  poster_path: string;
  overview: string;
  name: string | undefined;
  title: string | undefined;
};

export type ShareFileProps = {
  title: string;
  text: string;
  url: string;
  files: File[];
};
