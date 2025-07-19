'use client'

import { useEffect, useState } from 'react'
import { getFavorites } from '../utils/favorites'
import MovieCard from '../component/MovieCard'

const FavoritesPage = () => {
  const [movies, setMovies] = useState<any[]>([])

  useEffect(() => {
    const fetchFavorites = async () => {
      const favIds = getFavorites()
      const results = await Promise.all(
        favIds.map(async id => {
          const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
          return res.ok ? res.json() : null
        })
      )
      setMovies(results.filter(Boolean))
    }

    fetchFavorites()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorite Movies</h1>
      {movies.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage
