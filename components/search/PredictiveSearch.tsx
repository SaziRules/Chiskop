"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface SearchResult {
  type: string;
  id: string;
  title: string;
  excerpt?: string;
  url: string;
  image?: string;
  category?: string;
  groupTitle?: string;
}

interface PredictiveSearchProps {
  variant?: "default" | "navbar" | "mobile";
}

export default function PredictiveSearch({ variant = "default" }: PredictiveSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    router.push(result.url);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "product":
        return "🛍️";
      case "faq":
        return "❓";
      case "tip":
        return "💡";
      default:
        return "📄";
    }
  };

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case "product":
        return "Product";
      case "faq":
        return "FAQ";
      case "tip":
        return "Tip";
      default:
        return "Page";
    }
  };

  // Navbar variant (dark background, pill shape)
  if (variant === "navbar") {
    return (
      <div ref={searchRef} className="relative w-[200px]">
        <div className="flex items-center bg-white/10 rounded-full pl-3 pr-1 h-7">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            placeholder="Search"
            className="bg-transparent text-white placeholder-white/70 text-xs w-full focus:outline-none"
          />
          
          <div className="shrink-0 w-6 h-6 rounded-full bg-[#383838] flex items-center justify-center">
            {isLoading ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3 text-white"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </div>
        </div>

        {/* Results Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[400px] overflow-y-auto z-100">
            {results.length === 0 && !isLoading && (
              <div className="p-4 text-center text-gray-500 text-sm">
                No results found for "{query}"
              </div>
            )}

            {results.map((result, index) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleResultClick(result)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                  selectedIndex === index ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.type === "product" && result.image ? (
                    <div className="w-12 h-12 shrink-0 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={result.image}
                        alt={result.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 shrink-0 bg-gray-100 rounded flex items-center justify-center text-2xl">
                      {getResultIcon(result.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-chiskop-red uppercase">
                        {getResultTypeLabel(result.type)}
                      </span>
                      {result.groupTitle && (
                        <span className="text-xs text-gray-500">
                          • {result.groupTitle}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                      {result.title}
                    </h4>

                    {result.excerpt && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {result.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 text-gray-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}

            {results.length > 0 && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-chiskop-red hover:text-chiskop-red/80 font-medium flex items-center justify-center gap-1"
                >
                  View all results for "{query}"
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Mobile variant
  if (variant === "mobile") {
    return (
      <div ref={searchRef} className="relative w-full">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            placeholder="Search products, FAQs..."
            className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chiskop-red focus:border-transparent text-sm"
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-chiskop-red border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[300px] overflow-y-auto z-100">
            {results.length === 0 && !isLoading && (
              <div className="p-4 text-center text-gray-500 text-sm">
                No results for "{query}"
              </div>
            )}

            {results.map((result, index) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => handleResultClick(result)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getResultIcon(result.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {result.title}
                    </p>
                    <p className="text-xs text-chiskop-red">
                      {getResultTypeLabel(result.type)}
                    </p>
                  </div>
                </div>
              </button>
            ))}

            {results.length > 0 && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => setIsOpen(false)}
                className="block p-3 text-center text-sm text-chiskop-red font-medium bg-gray-50"
              >
                View all results
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default variant (for standalone use)
  return (
    <div ref={searchRef} className="relative w-full max-w-[500px]">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search products, FAQs, tips..."
          className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-chiskop-red focus:border-transparent"
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-chiskop-red border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[400px] overflow-y-auto z-50">
          {/* Same dropdown content as before */}
        </div>
      )}
    </div>
  );
}