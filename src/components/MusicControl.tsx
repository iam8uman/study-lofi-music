import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Track } from "@/hooks/useAudioPlayer";

interface MusicControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  currentTrack: Track | null;
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
      <div className="relative group">
        <div className="w-8 h-8 rounded-3xl bg-gray-800 bg-opacity-60  shadow-lg backdrop-blur-sm border-2 border-slate-100 shadow-neon flex items-center justify-center transition-all duration-300 group-hover:w-48 group-hover:h-12 group-hover:shadow-neon-lg">
          <div className="hidden group-hover:flex space-x-4">
            <Button variant="ghost" size="icon" onClick={previousTrack} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800 rounded-full">
              <SkipBack className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={togglePlayPause} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800 rounded-full">
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={nextTrack} className="text-purple-300 hover:text-purple-100 hover:bg-purple-800 rounded-full">
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {currentTrack && (
        <div className="text-center mt-4">
          <p className="text-lg font-semibold text-purple-200">{currentTrack.title}</p>
          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
        </div>
      )}
    </div>
  );
}