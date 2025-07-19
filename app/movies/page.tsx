"use client";

import { useState, Suspense } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SkeletonGrid from "../component/SkeletonGrid";
import dynamic from "next/dynamic";

const MovieGrid = dynamic(() => import("../component/MovieGrid"), { ssr: false });

const MoviesPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");

  if (status === "loading") return <p className="p-6 text-white">Loading session...</p>;
  if (!session) return null;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white px-6 py-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="glassmorphic flex flex-col md:flex-row justify-between items-center mb-10 p-6 rounded-2xl shadow-lg space-y-4 md:space-y-0 backdrop-blur-md border border-white/10 bg-white/5">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-indigo-300">
            🎬 Explore <span className="text-white">Movies</span>
          </h1>

          <div className="flex items-center gap-4">
            <Link
              href="/favorites"
              className="px-6 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/20 backdrop-blur-md hover:bg-indigo-400/30 hover:shadow-lg transition font-medium text-white"
            >
              ⭐ My Favorites
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-6 py-2 rounded-full bg-red-500/20 border border-red-400/20 backdrop-blur-md hover:bg-red-400/30 hover:shadow-lg transition font-medium text-white cursor-pointer"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="🔍 Search for a movie..."
            className="w-full md:w-1/2 px-6 py-3 rounded-2xl bg-white/10 text-white placeholder-white/60 border border-white/10 backdrop-blur-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <Suspense fallback={<SkeletonGrid />}>
          <MovieGrid search={search} />
        </Suspense>
      </div>
    </div>
  );
};

export default MoviesPage;
