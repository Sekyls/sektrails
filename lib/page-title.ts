export function getPageTitle(pathname: string): string {
  switch (pathname) {
    //  Movies
    case "/specialties/movie/popular":
      return "Popular Movies";
    case "/specialties/movie/top_rated":
      return "Top Rated Movies";
    case "/specialties/movie/upcoming":
      return "Upcoming Releases";
    case "/specialties/movie/now_playing":
      return "Currently In Theaters";

    //  Shows
    case "/specialties/tv/popular":
      return "Popular Shows";
    case "/specialties/tv/top_rated":
      return "Top Rated Shows";
    case "/specialties/tv/on_the_air":
      return "Currently Airing";
    case "/specialties/tv/airing_today":
      return "Airing Today";

    // Trending
    case "/specialties/trending/all/week":
      return "Trending This Week";

    // Secondary
    case "/specialties/bookmarks":
      return "Bookmarks";
    case "/specialties/search":
      return "Search";

    default:
      return "Specialties";
  }
}
