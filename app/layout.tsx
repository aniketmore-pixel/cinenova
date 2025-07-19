import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./component/SessionWrapper";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

// Metadata for CineNova
export const metadata: Metadata = {
  title: "CineNova",
  description: "Discover, explore, and enjoy your favorite movies with CineNova.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} bg-black text-white`}
        >
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
