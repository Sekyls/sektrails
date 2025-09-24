"use client";
import { TMDBResourceWithExtras } from "@/lib/types";
import { useAuth } from "@/providers/firebase-auth-provider";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import WidthConstraint from "../ui/width-constraint";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import WatchTrailer from "../miscellaneous/watch-trailer";
import Bookmark from "../miscellaneous/add-bookmark";
import ShareResource from "../miscellaneous/share-resource";

export default function ResourceData({
  meta,
}: {
  meta: TMDBResourceWithExtras;
}) {
  const { user } = useAuth();
  const trailer = meta?.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  return (
    <section className="mb-20 overflow-x-hidden">
      {/* backdrop image card */}
      <Card className={cn("p-0 overflow-x-hidden rounded-t-none")}>
        <CardContent className="p-0 relative">
          <Image
            src={
              meta.backdrop_path
                ? "https://image.tmdb.org/t/p/original" + meta.backdrop_path
                : "/fallback.jpg"
            }
            alt={meta.name || "N/A"}
            className="aspect-[16/9] w-full"
            width={1280}
            height={720}
            priority
          />
          {/* resource metadata */}
          <WidthConstraint className="absolute bottom-0 sm:bottom-1/12 space-y-5  flex-col right-0 left-0 items-center">
            <h3 className="tracking-widest hover-underline w-fit text-shadow-md text-shadow-primary text-center max-[587px]:text-lg! text-white">
              {meta.title}
            </h3>
            <div className="hidden sm:flex">
              {trailer ? (
                <WatchTrailer videoKey={trailer.key} name={trailer.name} />
              ) : (
                <Button
                  className="w-full sm:w-fit text-xl sm:text-3xl p-5 rounded-sm font-dancingScript font-bold text-white"
                  size="lg"
                  disabled
                >
                  No trailer available
                </Button>
              )}
            </div>
          </WidthConstraint>
        </CardContent>
        <WidthConstraint>
          <CardFooter className="block space-y-5 px-0 sm:px-6">
            {/* watch trailer, bookmark, and share mobile*/}
            <article className="sm:hidden space-y-2">
              {trailer ? (
                <div className="grid grid-cols-[2fr_1fr]">
                  <WatchTrailer videoKey={trailer.key} name={trailer.name} />
                  <div className="flex gap-5 mt-2 justify-center text-primary sm:hidden ml-auto">
                    <Bookmark resource={meta} user={user} />
                    <ShareResource
                      poster_path={meta.poster_path}
                      overview={meta.overview}
                      name={meta.name}
                      title={meta.title}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2">
                  <Button
                    className="w-full sm:w-fit text-xl sm:text-3xl px-2 font-dancingScript font-bold text-white py-2"
                    disabled
                  >
                    No trailer available
                  </Button>
                  <div className="flex gap-5 mt-2 justify-center sm:hidden">
                    <Bookmark resource={meta} user={user} />
                    <ShareResource
                      poster_path={meta.poster_path}
                      overview={meta.overview}
                      name={meta.name}
                      title={meta.title}
                    />
                  </div>
                </div>
              )}
            </article>

            {/* resource metadata II */}
            <article className="flex justify-between">
              <div className="flex gap-5 sm:gap-x-5 ">
                <div className="px-10 sm:px-2  sm:w-30 flex text-lg items-center justify-center bg-primary rounded-md text-white font-black sm:text-2xl">
                  {meta.vote_average.toFixed(1)}
                </div>
                <div className="space-y-2 font-bold">
                  <p>
                    Status: <span className="text-primary">{meta.status}</span>
                  </p>
                  <p>
                    {meta.runtime ? (
                      <span>
                        Duration:{" "}
                        <span className="text-primary">
                          {meta.runtime} Minutes
                        </span>
                      </span>
                    ) : (
                      <span>
                        Number of Seasons:{" "}
                        <span className="text-primary">
                          {meta.number_of_seasons}
                        </span>
                      </span>
                    )}
                  </p>
                  <p>
                    {meta.release_date ? (
                      <span>
                        Release Date:{" "}
                        <span className="text-primary">
                          {meta.release_date}
                        </span>
                      </span>
                    ) : (
                      <span>
                        First Air Date:{" "}
                        <span className="text-primary">
                          {meta.first_air_date}
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* watch trailer, bookmark, and share desktop*/}
              <div className="hidden sm:flex gap-x-5 items-center justify-end">
                <div className="flex gap-x-1 text-primary font-semibold items-center justify-center">
                  <p className="text-foreground">Bookmark</p>
                  <Bookmark resource={meta} user={user} />
                </div>
                <div className="flex gap-x-1 text-primary font-semibold items-center justify-center">
                  <p className="text-foreground">Share</p>
                  <ShareResource
                    poster_path={meta.poster_path}
                    overview={meta.overview}
                    name={meta.name}
                    title={meta.title}
                  />
                </div>
              </div>
            </article>
            <div className="font-bold leading-10 text-justify max-w-2xl mb-2 text-primary">
              Synopsis:{" "}
              <span className="italic text-foreground">{meta.overview}</span>
            </div>
          </CardFooter>
        </WidthConstraint>
      </Card>
    </section>
  );
}
