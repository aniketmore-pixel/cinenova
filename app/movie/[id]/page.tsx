// app/movie/[id]/page.tsx

import Head from "next/head";
import { notFound } from "next/navigation";

const API_KEY = process.env.TMDB_API_KEY!;

async function getMovie(id: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function MovieDetailPage({ params }: any) {
  const movie = await getMovie(params.id);

  if (!movie) return notFound();

  return (
    <>
      <Head>
        <title>{movie.title}</title>
        <meta name="description" content={movie.overview} />
      </Head>

      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 rounded-3xl shadow-xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl p-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-2xl w-full md:w-1/3 shadow-md"
          />
          <div className="text-white">
            <h1 className="text-4xl font-extrabold mb-3 text-blue-200">
              {movie.title}
            </h1>
            <p className="text-sm text-blue-300 mb-2">
              🎬 Released:{" "}
              <span className="text-blue-100">{movie.release_date}</span>
            </p>
            <p className="text-sm text-blue-100 mb-4">{movie.overview}</p>
            <p className="text-lg font-semibold text-yellow-400 mb-2">
              ⭐ {movie.vote_average.toFixed(1)} / 10
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres?.map((genre: any) => (
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
    </>
  );
}
