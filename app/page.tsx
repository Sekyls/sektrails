"use client";
import MovieSection from "@/components/movie-section";
import TrailersCarousel from "@/components/trailer-carousel";
import { MOVIE_SECTIONS } from "@/lib/constants";
import React from "react";

const Home = () => {
  return (
    <section>
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
    </section>
  );
};

export default Home;
