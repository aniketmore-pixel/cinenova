"use client";

import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BackButton from "./BackButton"; 

const MovieCard = ({ movie }: { movie: any }) => {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(movie.id));
  }, [movie.id]);

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const updatedFavs = toggleFavorite(movie.id);
    setFav(updatedFavs.includes(movie.id));
  };

  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div
        className="relative rounded-3xl overflow-hidden shadow-xl w-60 transition-transform duration-300 hover:scale-105 
        border border-blue-500/40 bg-blue-500/10 backdrop-blur-xl 
        hover:ring-2 hover:ring-blue-400/40"
      >
        <div className="relative w-full h-96">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw"
          />
        </div>

        <div className="p-4 space-y-1">
          <h3 className="text-lg font-bold truncate text-white">
            {movie.title}
          </h3>
          <p className="text-sm text-blue-300">
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
        </div>

        <button
          className="absolute top-3 right-3 backdrop-blur-md bg-blue-500/20 p-2 rounded-full shadow-md hover:scale-110 transition cursor-pointer"
          onClick={handleFavClick}
        >
          <Heart
            fill={fav ? "red" : "none"}
            color={fav ? "red" : "gray"}
            size={20}
          />
        </button>
      </div>
    </Link>
  );
};

export default MovieCard;
