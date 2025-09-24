"use client";
import { ObserverProps } from "@/lib/types";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useRef } from "react";

export default function SentinelObserver({
  isLoading,
  totalPages,
  page,
  setPage,
}: ObserverProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading && page < (totalPages || 999)) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [isLoading, page, totalPages]);
  return (
    <div ref={loadMoreRef} className="h-12 flex items-center justify-center">
      {isLoading && <Loader2Icon className="animate-spin text-primary" />}
      {page >= (totalPages || 999) && <p className="text-primary">Loading</p>}
    </div>
  );
}
