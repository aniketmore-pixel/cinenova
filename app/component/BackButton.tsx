"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 px-4 py-2 rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-300 hover:text-white hover:bg-blue-500/20 transition-all duration-200 backdrop-blur-md shadow-sm"
    >
      ← Back
    </button>
  );
}
