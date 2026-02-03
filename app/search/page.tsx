import { Suspense } from "react";
import SearchResults from "@/components/search/SearchResults";

export const metadata = {
  title: "Search Results • Chiskop For Men",
  description: "Search results for Chiskop products, FAQs, and more",
};

function SearchLoadingFallback() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex gap-2 mb-8">
          <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Results Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoadingFallback />}>
      <SearchResults />
    </Suspense>
  );
}