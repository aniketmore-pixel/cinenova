
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ search }: { search: string }) {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || isSearching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, isSearching]
  );

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (search.trim() === "") return;

      setLoading(true);
      setIsSearching(true);
      const res = await fetch(`/api/search?query=${encodeURIComponent(search)}`);
      const data = await res.json();
      setMovies(data.results || []);
      setLoading(false);
    };

    fetchSearchResults();
  }, [search]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      if (search.trim() !== "") return;

      setLoading(true);
      const res = await fetch(`/api/movies?page=${page}`);
      const data = await res.json();

      setMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newMovies = data.results.filter(
          (m: any) => !existingIds.has(m.id)
        );
        return [...prev, ...newMovies];
      });

      setLoading(false);
    };

    fetchPopularMovies();
  }, [page, search]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-10 gap-y-10 px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie, i, filtered) => (
            <div
              ref={!isSearching && i === filtered.length - 1 ? lastMovieRef : null}
              key={`${movie.id}-${i}`}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {!loading && movies.length === 0 && search.trim() !== "" && (
        <p className="text-center mt-4 text-gray-500">No results found.</p>
      )}
    </>
  );
}
