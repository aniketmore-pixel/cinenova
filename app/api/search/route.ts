// app/api/search/route.ts
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US`)

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
