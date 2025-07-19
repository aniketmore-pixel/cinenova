"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/movies");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-xl">
        Loading CineNova...
      </div>
    );
  }

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/movies-bg.jpg')" }}
    >
      {/* Black overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-zinc-900/70"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        {/* Logo */}
        <h1 className="text-5xl sm:text-6xl font-bold mb-12 tracking-tight text-indigo-400 drop-shadow-md">
          CINE<span className="text-white">NOVA</span>
        </h1>

        {/* Glass card */}
        <div className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-10 w-full max-w-md text-center space-y-6 transition hover:scale-[1.01] hover:shadow-indigo-500/20 duration-300">
          <p className="text-xl font-semibold tracking-wide text-white drop-shadow-sm">
            Welcome to CineNova
          </p>
          <button
            onClick={() => signIn("github")}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-full font-semibold text-white shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            Sign in with GitHub
          </button>
          <p className="text-sm text-zinc-300 font-light">
            Your gateway to cinematic discovery.
          </p>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/50 text-center mt-10">
          © {new Date().getFullYear()} Aniket More. All rights reserved.
        </p>
      </div>
    </div>
  );
}
