import { Suspense } from "react";
import SearchContent from "@/components/search-content"; // The new component

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
