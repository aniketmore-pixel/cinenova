# 🎬 Cinenova

Cinenova is a modern movie discovery app built with **Next.js 15**, **React 19**, **TailwindCSS 4**, and **NextAuth**.  
It allows users to explore popular movies, search by title, and save their favorites locally.

---
## 📸 Screenshots

> _You can add screenshots of the UI here_

---

## 🚀 Features

- 🔑 **Authentication** with NextAuth  
- 🎥 **Browse Popular Movies** (via TMDB API)  
- 🔍 **Search Movies** by title  
- ⭐ **Save Favorites** (localStorage)  
- 🎨 **Modern UI** with TailwindCSS & Lucide icons  
- 📱 Responsive & smooth user experience  

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, API routes)  
- [React 19](https://react.dev/)  
- [TailwindCSS 4](https://tailwindcss.com/)  
- [NextAuth](https://next-auth.js.org/)  
- [TMDB API](https://developer.themoviedb.org/docs) for movie data  
- [Lucide React](https://lucide.dev/) for icons  

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cinenova.git
   cd cinenova
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root and add:

   ```env
   TMDB_API_KEY=your_tmdb_api_key
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   The app will be running at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
cinenova/
├── app/
│   ├── api/
│   │   ├── movies/route.ts    # Popular movies endpoint
│   │   ├── search/route.ts    # Search movies endpoint
│   ├── favorites/             # Favorites page
│   ├── movie/[id]/            # Movie details page
│   └── page.tsx               # Home / Explore movies
│
├── components/
│   ├── MovieCard.tsx          # Movie card UI
│   ├── MovieGrid.tsx          # Movie grid with pagination
│   ├── SkeletonGrid.tsx       # Loading skeletons
│   └── BackButton.tsx         # Reusable back button
│
├── utils/
│   └── favorites.ts           # Favorites utils (localStorage)
│
├── public/                    # Static assets
├── styles/                    # Tailwind styles
└── package.json
```

---



