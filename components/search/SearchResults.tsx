"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface SearchResult {
  _id?: string;
  type: string;
  title: string;
  description?: string;
  url: string;
  image?: string;
  category?: string;
  groupTitle?: string;
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    if (!query) return;

    async function fetchResults() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  // Filter results by type
  const filteredResults = activeFilter === "all"
    ? results
    : results.filter((r) => r.type === activeFilter);

  // Get counts for each type
  const counts = {
    all: results.length,
    product: results.filter((r) => r.type === "product").length,
    faq: results.filter((r) => r.type === "faq").length,
    tip: results.filter((r) => r.type === "tip").length,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-chiskop-black mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                Found <strong>{results.length}</strong> results for{" "}
                <strong>"{query}"</strong>
              </>
            )}
          </p>
        </div>

        {/* Filters */}
        {!isLoading && results.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "all"
                  ? "bg-chiskop-red text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({counts.all})
            </button>
            {counts.product > 0 && (
              <button
                onClick={() => setActiveFilter("product")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === "product"
                    ? "bg-chiskop-red text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Products ({counts.product})
              </button>
            )}
            {counts.faq > 0 && (
              <button
                onClick={() => setActiveFilter("faq")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === "faq"
                    ? "bg-chiskop-red text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                FAQs ({counts.faq})
              </button>
            )}
            {counts.tip > 0 && (
              <button
                onClick={() => setActiveFilter("tip")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === "tip"
                    ? "bg-chiskop-red text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tips ({counts.tip})
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-chiskop-red border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* No Results */}
        {!isLoading && results.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No results found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find anything matching "{query}"
            </p>
            <Link
              href="/"
              className="inline-block bg-chiskop-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-chiskop-red/90 transition"
            >
              Back to Home
            </Link>
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && filteredResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result, index) => (
              <Link
                key={`${result.type}-${result._id || index}`}
                href={result.url}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image / Icon */}
                {result.type === "product" && result.image ? (
                  <div className="aspect-square bg-gray-100 relative">
                    <Image
                      src={result.image}
                      alt={result.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-6xl">
                      {result.type === "faq" ? "❓" : result.type === "tip" ? "💡" : "📄"}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  {/* Type Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-chiskop-red uppercase">
                      {result.type}
                    </span>
                    {result.category && (
                      <span className="text-xs text-gray-500">• {result.category}</span>
                    )}
                    {result.groupTitle && (
                      <span className="text-xs text-gray-500">• {result.groupTitle}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {result.title}
                  </h3>

                  {/* Description */}
                  {result.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {result.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}