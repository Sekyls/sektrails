"use client";
import { useAuth } from "@/providers/firebase-auth-provider";
import { getPagedBookmarks } from "@/lib/bookmark";
import { useEffect, useState } from "react";
import { TMDBGroupResourceListItem } from "@/lib/types";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import SentinelRefetchObserver from "@/components/observers/refetch-observer";
import MovieCard from "@/components/miscellaneous/resource-card";

export default function BookmarksPage() {
  const [docs, setDocs] = useState<TMDBGroupResourceListItem[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const { docs: newDocs, lastDoc: newLastDoc } = await getPagedBookmarks(
          user
        );

        setDocs(newDocs as TMDBGroupResourceListItem[]);
        setLastDoc(newLastDoc);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  return user ? (
    <>
      <section className="grid grid-cols-2 gap-x-2 sm:gap-x-10 min-[970px]:grid-cols-3 min-[1320px]:grid-cols-4 gap-y-10 mx-2.5 mt-4 min-[640px]:mx-auto min-[1700px]:grid-cols-5">
        {docs.map((movie: TMDBGroupResourceListItem, index) => (
          <MovieCard
            resourceID={movie.id}
            mediaType={movie.media_type}
            title={movie.title}
            image={
              movie.poster_path
                ? "https://image.tmdb.org/t/p/original" + movie.poster_path
                : "/fallback.jpg"
            }
            imgAlt={movie.title ?? ""}
            key={movie.id ?? index}
            resource={movie}
            user={user}
            bookmarked
            setDocs={setDocs}
          />
        ))}
      </section>
      <SentinelRefetchObserver
        isFetchingMore={isFetchingMore}
        isLoading={isLoading}
        lastDoc={lastDoc}
        setDocs={setDocs}
        setIsFetchingMore={setIsFetchingMore}
        setLastDoc={setLastDoc}
        user={user}
      />
    </>
  ) : (
    <p className="flex justify-center items-center h-full font-black text-lg! w-full">
      Log in to view Bookmarks
    </p>
  );
}
