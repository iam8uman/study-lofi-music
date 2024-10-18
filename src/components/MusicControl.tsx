import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { Track } from "@/hooks/useAudioPlayer"

interface MusicControlsProps {
  isPlaying: boolean
  togglePlayPause: () => void
  nextTrack: () => void
  previousTrack: () => void
  currentTrack: Track | null
}

export function MusicControls({
  isPlaying,
  togglePlayPause,
  nextTrack,
  previousTrack,
  currentTrack,
}: MusicControlsProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={previousTrack} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800">
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" onClick={togglePlayPause} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800">
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={nextTrack} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800">
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>
      {currentTrack && (
        <div className="text-center">
          <p className="text-lg font-semibold text-purple-200">{currentTrack.title}</p>
          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
        </div>
      )}
    </div>
  )
}