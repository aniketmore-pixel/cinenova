// app/api/movies/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get("page") || "1"

  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`)

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
