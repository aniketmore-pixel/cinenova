// utils/favorites.ts
export const getFavorites = (): number[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem('favorites')
    return data ? JSON.parse(data) : []
  }
  
  export const toggleFavorite = (movieId: number) => {
    const favorites = getFavorites()
    const isFav = favorites.includes(movieId)
    const updated = isFav
      ? favorites.filter(id => id !== movieId)
      : [...favorites, movieId]
    localStorage.setItem('favorites', JSON.stringify(updated))
    return updated
  }
  
  export const isFavorite = (movieId: number): boolean => {
    const favorites = getFavorites()
    return favorites.includes(movieId)
  }
  