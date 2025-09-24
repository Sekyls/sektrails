"use client";
import React from "react";
import WidthConstraint from "@/components/ui/width-constraint";
import useFetchTMDBResourceWithExtras from "@/hooks/use-tmdb-fetch-with-extras";
import { TMDBApiPaths } from "@/lib/types";
import { useParams } from "next/navigation";
import ResourceData from "@/components/previews/resource-data";
import ResourceReviews from "@/components/previews/resource-reviews";
import ResourceCasts from "@/components/previews/resource-casts";
import ResourceSuggestions from "@/components/previews/resource-suggestions";
import NavigationMenu from "@/components/miscellaneous/navigation-menu";
import Footer from "@/components/miscellaneous/footer";

export default function ResourcePreviewPage() {
  const { resource } = useParams<{ resource: string[] }>();
  const [mediaType, ID] = resource;
  const { data, error } = useFetchTMDBResourceWithExtras(
    ID,
    `/${mediaType}/${ID}` as TMDBApiPaths,
    { append_to_response: "videos,credits,recommendations,similar" }
  );

  if (!resource || resource.length < 2) {
    return <p>Invalid resource path</p>;
  }

  if (!data) {
    return <p>{error?.message}</p>;
  }
  const { credits, similar, recommendations, ...meta } = data!;
  return (
    <div className="overflow-x-hidden">
      <header>
        <NavigationMenu />
      </header>
      <ResourceData meta={meta} />
      <main>
        <WidthConstraint className="space-y-20">
          <ResourceReviews
            resourceID={meta.id}
            mediaType={meta.title ? "movie" : "tv"}
          />
          <ResourceCasts credits={credits!} />
          <ResourceSuggestions suggestion={similar!} />
          <ResourceSuggestions suggestion={recommendations!} />
        </WidthConstraint>
      </main>
      <footer className="w-full mt-45 space-y-10 pb-8 bg-primary text-white pt-10">
        <Footer />
      </footer>
    </div>
  );
}
