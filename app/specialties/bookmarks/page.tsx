"use client";

import { Loader2Icon } from "lucide-react";
import { useAuth } from "@/providers/firebase-auth-provider";
import MovieCard from "@/components/resource-card";
import { getPagedBookmarks } from "@/lib/bookmark";
import { useEffect, useRef, useState } from "react";
import { TMDBGroupResourceListItem } from "@/lib/types";

export default function BookmarksPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [lastDoc, setLastDoc] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const { docs: newDocs, lastDoc: newLastDoc } = await getPagedBookmarks(
          user
        );

        setDocs(newDocs);
        setLastDoc(newLastDoc);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!loaderRef.current || !user || !lastDoc) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          setIsFetchingMore(true);

          try {
            const { docs: newDocs, lastDoc: newLastDoc } =
              await getPagedBookmarks(user, lastDoc);

            if (newDocs.length > 0) {
              setDocs((prev) => [...prev, ...newDocs]);
              setLastDoc(newLastDoc);
            } else {
              setLastDoc(null);
            }
          } catch (err) {
            console.error("Error fetching more bookmarks:", err);
          } finally {
            setIsFetchingMore(false);
          }
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [user, lastDoc, isFetchingMore]);

  return (
    <>
      <section className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-y-10 gap-x-5 m-10">
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
          />
        ))}
      </section>

      <div ref={loaderRef} className="h-12 flex items-center justify-center">
        {isLoading && <Loader2Icon className="animate-spin text-primary" />}
        {isFetchingMore && <p className="text-primary">Loading more…</p>}
        {!lastDoc && !isLoading && (
          <p className="text-muted">No more bookmarks</p>
        )}
      </div>
    </>
  );
}
