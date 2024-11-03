import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const monofett = Ubuntu({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Lofi❤️‍🩹Girl | Focus and Relax",
  description:
    "Enhance your study sessions with our curated lo-fi music playlists. Boost concentration and productivity with ambient background tunes.",
  keywords:
    "lo-fi, study music, focus, concentration, ambient, background music",
  openGraph: {
    title: "Lofi❤️‍🩹Girl | Focus and Relax",
    description:
      "Enhance your study sessions with our curated lo-fi music playlists. Boost concentration and productivity with ambient background tunes.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lofi❤️‍🩹Girl | Focus and Relax",
    description:
      "Enhance your study sessions with our curated lo-fi music playlists. Boost concentration and productivity with ambient background tunes.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={monofett.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
