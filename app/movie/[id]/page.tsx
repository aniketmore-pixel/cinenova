import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
}

const API_KEY = process.env.TMDB_API_KEY!;

async function getMovie(id: string): Promise<MovieDetail | null> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

type PageProps = {
  params: {
    id: string;
  };
};

// ✅ OK: Props can be a Promise here in generateMetadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const movie = await getMovie(params.id);
  return {
    title: movie?.title ?? "Movie Not Found",
    description: movie?.overview ?? "",
  };
}

// ✅ FIXED: props is NOT a Promise in the page component
export default async function MovieDetailPage({ params }: PageProps) {
  const movie = await getMovie(params.id);

  if (!movie) {
    return notFound();
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 rounded-3xl shadow-xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl p-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-2xl w-full md:w-1/3 shadow-md"
        />
        <div className="text-white">
          <h1 className="text-4xl font-extrabold mb-3 text-blue-200">{movie.title}</h1>
          <p className="text-sm text-blue-300 mb-2">
            🎬 Released: <span className="text-blue-100">{movie.release_date}</span>
          </p>
          <p className="text-sm text-blue-100 mb-4">{movie.overview}</p>
          <p className="text-lg font-semibold text-yellow-400 mb-2">
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
