"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MovieFavoriteButton({ movie }: { movie: any }) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const alreadyExists = favorites.find((m: any) => m.id === movie.id);

    if (!alreadyExists) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (!session) return null;

  return (
    <button
      onClick={handleFavorite}
      className="mt-4 px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold shadow-md"
    >
      {isFavorite ? "✅ Added to Favorites" : "⭐ Add to Favorites"}
    </button>
  );
}
