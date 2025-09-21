import { TMDBApiPaths } from "./types";
import {
  IconBookmarkFilled,
  IconCalendar,
  IconDeviceTv,
  IconMovie,
  IconPlayerPlay,
  IconSearch,
  IconStarFilled,
  IconTrendingUp,
  IconUserScreen,
  IconView360,
  IconWorldStar,
} from "@tabler/icons-react";
import wednesday from "@/videos/wednesday.mp4";
import wuthering from "@/videos/wuthering.mp4";
import twot from "@/videos/twot.mp4";

export const TRAILERS = [
  {
    path: wednesday,
    title: "Wednesday Season II",
    description:
      "While attending Nevermore Academy, Wednesday Addams attempts to master her emerging psychic ability, thwart a killing spree and solve the mystery that embroiled her parents 25 years ago.",
  },
  {
    path: wuthering,
    title: "Wuthering Heights",
    description:
      "Tragedy strikes when Heathcliff falls in love with Catherine Earnshaw, a woman from a wealthy family in 18th-century England.",
  },
  {
    path: twot,
    title: "The Wheel Of Time",
    description:
      "Moiraine, a member of a magical organization, takes five young people on a journey, believing that one of them might be the reincarnation of the Dragon, a powerful individual prophesied to save the world or destroy it.",
  },
];

export const MOVIE_SECTIONS = [
  {
    category: "Popular Movies",
    seeAllLink: "/specialties/movie/popular",
    queryKey: "popular-movies",
    url: TMDBApiPaths.MoviePopular,
  },
  {
    category: "Top Rated Movies",
    seeAllLink: "/specialties/movie/top_rated",
    queryKey: "top-rated-movies",
    url: TMDBApiPaths.MovieTopRated,
  },
  {
    category: "Upcoming Releases",
    seeAllLink: "/specialties/movie/upcoming",
    queryKey: "upcoming-releases",
    url: TMDBApiPaths.MovieUpcoming,
  },
  {
    category: "Currently In Theaters",
    seeAllLink: "/specialties/movie/now_playing",
    queryKey: "currently-in-theaters",
    url: TMDBApiPaths.MovieNowPlaying,
  },
  {
    category: "Popular Shows",
    seeAllLink: "/specialties/tv/popular",
    queryKey: "popular-shows",
    url: TMDBApiPaths.TvPopular,
  },
];
export const MOVIE_SECTIONS_2 = [
  {
    category: "Top Rated Shows",
    seeAllLink: "/specialties/tv/top_rated",
    queryKey: "Top-Rated-Shows",
    url: TMDBApiPaths.TvTopRated,
  },
  {
    category: "Currently Airing",
    seeAllLink: "/specialties/tv/on_the_air",
    queryKey: "currently-airing",
    url: TMDBApiPaths.TvOnTheAir,
  },
  {
    category: "Airing Today",
    seeAllLink: "/specialties/tv/airing_today",
    queryKey: "airing-today",
    url: TMDBApiPaths.TvAiringToday,
  },
  {
    category: "Trending This Week",
    seeAllLink: "/specialties/trending/all/week",
    queryKey: "week-trends",
    url: TMDBApiPaths.Trending,
  },
];

export const SOCIAL_LINKS = [
  {
    name: "Email",
    webUrl:
      "mailto:denipsyp@gmail.com?subject=Hello&body=I%20want%20to%20contact%20you",
    imgPath: "/socials/email.png",
  },
  {
    name: "Telephone",
    webUrl: "tel:+233596379243",
    imgPath: "/socials/telephone.png",
  },
  {
    name: "LinkedIn",
    webUrl: "https://www.linkedin.com/in/sekyls",
    imgPath: "/socials/linkedin.png",
  },
  {
    name: "WhatsApp",
    webUrl: "https://wa.me/233203558362",
    imgPath: "/socials/whatsapp.png",
  },
  {
    name: "Instagram",
    webUrl: "https://www.instagram.com/opoku_sekyi_dennis/",
    imgPath: "/socials/instagram.png",
  },
  {
    name: "Telegram",
    webUrl: "https://t.me/Opoku_Sekyi_Dennis",
    imgPath: "/socials/telegram.png",
  },
  {
    name: "GitHub",
    webUrl: "https://github.com/Sekyls",
    imgPath: "/socials/github.png",
  },
];

export const FOOTER_LINKS = [
  {
    header: "Quick Links",
    links: [
      { title: "Popular Shows", sublink: "/specialties/tv/popular" },
      {
        title: "Currently In Theaters",
        sublink: "/specialties/movie/now_playing",
      },
      { title: "Upcoming Releases", sublink: "/specialties/movie/upcoming" },
      { title: "Top Rated Movies", sublink: "/specialties/movie/top_rated" },
      { title: "Popular Movies", sublink: "/specialties/movie/popular" },
      { title: "Currently Airing", sublink: "/specialties/tv/on_the_air" },
      { title: "Top Rated Shows", sublink: "/specialties/tv/top_rated" },
      {
        title: "Trending This Week",
        sublink: "/specialties/trending/all/week",
      },
      { title: "Airing Today", sublink: "/specialties/tv/airing_today" },
    ],
  },
  {
    header: "About Us",
    links: [
      { title: "Contact", sublink: "" },
      { title: "Documentation", sublink: "" },
    ],
  },
];

export const SIDEBAR_DATA = {
  user: {
    name: "Guest",
    email: "m@example.com",
    avatar: "",
  },
  mainCategories: [
    {
      category: {
        categoryName: "Movies",
        subCategories: [
          {
            title: "Popular",
            url: "/specialties/movie/popular",
            icon: IconView360,
          },
          {
            title: "Top Rated",
            url: "/specialties/movie/top_rated",
            icon: IconStarFilled,
          },
          {
            title: "Upcoming Releases",
            url: "/specialties/movie/upcoming",
            icon: IconCalendar,
          },
          {
            title: "Currently In Theaters",
            url: "/specialties/movie/now_playing",
            icon: IconPlayerPlay,
          },
        ],
      },
    },
    {
      category: {
        categoryName: "Shows",
        subCategories: [
          {
            title: "Popular",
            url: "/specialties/tv/popular",
            icon: IconMovie,
          },
          {
            title: "Top Rated",
            url: "/specialties/tv/top_rated",
            icon: IconWorldStar,
          },
          {
            title: "Currently Airing",
            url: "/specialties/tv/on_the_air",
            icon: IconUserScreen,
          },
          {
            title: "Airing Today",
            url: "/specialties/tv/airing_today",
            icon: IconDeviceTv,
          },
        ],
      },
    },
    {
      category: {
        categoryName: "Trending",
        subCategories: [
          {
            title: "Trending This Week",
            url: "/specialties/trending/all/week",
            icon: IconTrendingUp,
          },
        ],
      },
    },
  ],
  navSecondary: [
    {
      title: "Bookmarks",
      url: "/specialties/bookmarks",
      icon: IconBookmarkFilled,
    },
    {
      title: "Search",
      url: "/specialties/search",
      icon: IconSearch,
    },
  ],
};
