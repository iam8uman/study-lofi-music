import { useState, useEffect, useRef } from 'react'

export interface Track {
  id: string
  title: string
  artist: string
  url: string
}

export function useAudioPlayer() {
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.addEventListener('ended', handleTrackEnd)
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleTrackEnd)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (currentTrackIndex >= 0 && currentTrackIndex < playlist.length) {
      if (audioRef.current) {
        audioRef.current.src = playlist[currentTrackIndex].url
        if (isPlaying) {
          audioRef.current.play()
        }
      }
    }
  }, [currentTrackIndex, playlist, isPlaying])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length)
  }

  const previousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length)
  }

  const addToPlaylist = (track: Track) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, track])
    if (currentTrackIndex === -1) {
      setCurrentTrackIndex(0)
    }
  }

  const removeFromPlaylist = (trackId: string) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((track) => track.id !== trackId))
    if (playlist[currentTrackIndex].id === trackId) {
      nextTrack()
    }
  }

  const handleTrackEnd = () => {
    nextTrack()
  }

  return {
    currentTrack: playlist[currentTrackIndex],
    isPlaying,
    togglePlayPause,
    setVolume,
    nextTrack,
    previousTrack,
    playlist,
    addToPlaylist,
    removeFromPlaylist,
  }
}