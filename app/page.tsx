"use client";
import Footer from "@/components/footer";
import MoreForYou from "@/components/more-for-you-banner";
import MovieSection from "@/components/movie-section";
import NavigationMenu from "@/components/navigation-menu";
import TrailersCarousel from "@/components/trailer-carousel";
import WidthConstraint from "@/components/ui/width-constraint";
import { MOVIE_SECTIONS, MOVIE_SECTIONS_2 } from "@/lib/constants";
import React from "react";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <header>
        <NavigationMenu />
      </header>
      <main className="mt-10 sm:mt-0">
        <TrailersCarousel />
        <article className="space-y-20">
          {MOVIE_SECTIONS.map((category, index) => {
            return (
              <MovieSection
                key={index}
                category={category.category}
                queryKey={category.queryKey}
                seeAllLink={category.seeAllLink}
                url={category.url}
              />
            );
          })}
        </article>
        <WidthConstraint className="space-y-20 mt-20">
          <MoreForYou />
        </WidthConstraint>
        <article className="space-y-20 mt-15">
          {MOVIE_SECTIONS_2.map((category, index) => {
            return (
              <MovieSection
                key={index}
                category={category.category}
                queryKey={category.queryKey}
                seeAllLink={category.seeAllLink}
                url={category.url}
              />
            );
          })}
        </article>
      </main>
      <footer className="w-full mt-45 space-y-10 pb-8 bg-primary text-white pt-10">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
