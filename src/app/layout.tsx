import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lo-Fi Study Music | Focus and Relax',
  description: 'Enhance your study sessions with our curated lo-fi music playlists. Boost concentration and productivity with ambient background tunes.',
  keywords: 'lo-fi, study music, focus, concentration, ambient, background music',
  openGraph: {
    title: 'Lo-Fi Study Music | Focus and Relax',
    description: 'Enhance your study sessions with our curated lo-fi music playlists. Boost concentration and productivity with ambient background tunes.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lo-Fi Study Music | Focus and Relax',
    description: 'Enhance your study sessions with our curated lo-fi music playlists. Boost concentration and productivity with ambient background tunes.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}