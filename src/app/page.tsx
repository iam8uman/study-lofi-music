'use client'

import { useState, useEffect } from 'react'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { BackgroundGif } from '@/components/BackgroundGif'
import { MusicControls } from '@/components/MusicControl'
import { VolumeControl } from '@/components/VolumeControl'
import { PlaylistControl } from '@/components/PlaylistControl'
import { Timer } from '@/components/Timer'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    setVolume,
    nextTrack,
    previousTrack,
    playlist,
    addToPlaylist,
    removeFromPlaylist
  } = useAudioPlayer()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-900 text-gray-100">
      <BackgroundGif />
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-[2px]">
        <div className="container mx-auto px-4 py-8 flex flex-col h-full">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-purple-300 mb-4 tracking-tight">Lo-Fi Study Music</h1>
            <p className="text-xl text-gray-300">Focus, Relax, and Study</p>
          </header>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <MusicControls
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                nextTrack={nextTrack}
                previousTrack={previousTrack}
                currentTrack={currentTrack}
              />
            </div>
            <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <VolumeControl setVolume={setVolume} />
            </div>
            <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <PlaylistControl
                playlist={playlist}
                addToPlaylist={addToPlaylist}
                removeFromPlaylist={removeFromPlaylist}
              />
            </div>
            <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg shadow-lg backdrop-blur-sm">
              <Timer />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}