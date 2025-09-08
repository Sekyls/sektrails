import { TMDBApiPaths } from "./types";

export const TRAILERS = [
  {
    path: "trailers/wednesday.mp4",
    title: "Wednesday Season II",
    description:
      "While attending Nevermore Academy, Wednesday Addams attempts to master her emerging psychic ability, thwart a killing spree and solve the mystery that embroiled her parents 25 years ago.",
  },
  {
    path: "trailers/wuthering.mp4",
    title: "Wuthering Heights",
    description:
      "Tragedy strikes when Heathcliff falls in love with Catherine Earnshaw, a woman from a wealthy family in 18th-century England.",
  },
  {
    path: "trailers/twot.mp4",
    title: "The Wheel Of Time",
    description:
      "Moiraine, a member of a magical organization, takes five young people on a journey, believing that one of them might be the reincarnation of the Dragon, a powerful individual prophesied to save the world or destroy it.",
  },
  {
    path: "trailers/superman.mp4",
    title: "Superman",
    description:
      "When Superman gets drawn into conflicts at home and abroad, his actions are questioned, giving tech billionaire Lex Luthor the opportunity to get the Man of Steel out of the way for good. Will intrepid reporter Lois Lane and Superman's four-legged companion, Krypto, be able to help him before it's too late?",
  },
];

export const MOVIE_SECTIONS = [
  {
    category: "Popular Movies",
    seeAllLink: "#",
    queryKey: "popular-movies",
    url: TMDBApiPaths.MoviePopular,
  },
  {
    category: "Top Rated Movies",
    seeAllLink: "#",
    queryKey: "top-rated-movies",
    url: TMDBApiPaths.MovieTopRated,
  },
  {
    category: "Upcoming Releases",
    seeAllLink: "#",
    queryKey: "upcoming-releases",
    url: TMDBApiPaths.MovieUpcoming,
  },
  {
    category: "Currently In Theaters",
    seeAllLink: "#",
    queryKey: "currently-in-theaters",
    url: TMDBApiPaths.MovieNowPlaying,
  },
  {
    category: "Popular Shows",
    seeAllLink: "#",
    queryKey: "popular-shows",
    url: TMDBApiPaths.TvPopular,
  },
];
export const MOVIE_SECTIONS_2 = [
  {
    category: "Top Rated Shows",
    seeAllLink: "#",
    queryKey: "Top-Rated-Shows",
    url: TMDBApiPaths.TvTopRated,
  },
  {
    category: "Currently Airing",
    seeAllLink: "#",
    queryKey: "currently-airing",
    url: TMDBApiPaths.TvOnTheAir,
  },
  {
    category: "Airing Today",
    seeAllLink: "#",
    queryKey: "airing-today",
    url: TMDBApiPaths.TvAiringToday,
  },
  {
    category: "Week Trends",
    seeAllLink: "#",
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
      { title: "Popular Shows", sublink: "" },
      { title: "Currently In Theaters", sublink: "" },
      { title: "Upcoming Releases", sublink: "" },
      { title: "Top Rated Movies", sublink: "" },
      { title: "Popular Movies", sublink: "" },
      { title: "Currently Airing", sublink: "" },
      { title: "Top Rated Shows", sublink: "" },
      { title: "Week Trends", sublink: "" },
      { title: "Airing Today", sublink: "" },
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
