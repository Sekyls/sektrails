"use client";
import { BookmarksSentinelProps, TMDBGroupResourceListItem } from "@/lib/types";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { getPagedBookmarks } from "@/lib/bookmark";

export default function SentinelRefetchObserver({
  isFetchingMore,
  lastDoc,
  user,
  isLoading,
  setDocs,
  setIsFetchingMore,
  setLastDoc,
}: BookmarksSentinelProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node || !user || !lastDoc) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          setIsFetchingMore(true);
          try {
            const { docs: newDocs, lastDoc: newLastDoc } =
              await getPagedBookmarks(user, lastDoc);
            if (newDocs.length > 0) {
              setDocs((prev) => [
                ...prev,
                ...(newDocs as TMDBGroupResourceListItem[]),
              ]);
              setLastDoc(newLastDoc);
            } else {
              setLastDoc(null);
            }
          } finally {
            setIsFetchingMore(false);
          }
        }
      },
      { threshold: 1 }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [user, lastDoc, isFetchingMore]);
  return (
    <div ref={loaderRef} className="h-12 flex items-center justify-center">
      {isLoading && <Loader2Icon className="animate-spin text-primary" />}
      {isFetchingMore && <p className="text-primary">Loading more…</p>}
      {!lastDoc && !isLoading && (
        <p className="text-muted">No more bookmarks</p>
      )}
    </div>
  );
}
