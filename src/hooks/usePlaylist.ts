import { useState } from 'react'

interface Track {
  id: string
  title: string
  artist: string
  url: string
}

export function usePlaylist() {
  const [playlist, setPlaylist] = useState<Track[]>([])

  const addToPlaylist = (track: Track) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, track])
  }

  const removeFromPlaylist = (trackId: string) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((track) => track.id !== trackId))
  }

  return {
    playlist,
    addToPlaylist,
    removeFromPlaylist,
  }
}