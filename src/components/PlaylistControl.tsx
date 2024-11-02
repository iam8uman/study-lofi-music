import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X, List } from "lucide-react";
import { Track } from "@/hooks/useAudioPlayer";

interface PlaylistControlProps {
  playlist: Track[];
  addToPlaylist: (track: Track) => void;
  removeFromPlaylist: (trackId: string) => void;
}

export function PlaylistControl({
  playlist,
  addToPlaylist,
  removeFromPlaylist,
}: PlaylistControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTrack, setNewTrack] = useState({ title: "", artist: "", url: "" });

  const handleAddTrack = () => {
    if (newTrack.title && newTrack.artist && newTrack.url) {
      addToPlaylist({
        id: Date.now().toString(),
        ...newTrack,
      });
      setNewTrack({ title: "", artist: "", url: "" });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <div className="w-8 h-8 rounded-3xl bg-gray-800 bg-opacity-60  shadow-lg backdrop-blur-sm border-2 border-slate-100 shadow-neon flex items-center justify-center transition-all duration-300 group-hover:w-48 group-hover:h-48 group-hover:shadow-neon-lg">
          <div className="hidden group-hover:flex flex-col items-center space-y-4 w-full px-4">
            <h3 className="text-lg font-semibold text-purple-300">Playlist</h3>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-purple-300 border-purple-300 hover:bg-purple-800 hover:text-purple-100"
                >
                  <List className="h-5 w-5 mr-2" /> View Playlist
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-100">
                <DialogHeader>
                  <DialogTitle className="text-purple-300">Playlist</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[300px] w-full rounded-md border border-gray-700 p-4">
                  {playlist.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between py-2 border-b border-gray-700"
                    >
                      <div>
                        <p className="font-medium text-purple-200">{track.title}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromPlaylist(track.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
                <div className="mt-4 space-y-2">
                  <Input
                    placeholder="Track Title"
                    value={newTrack.title}
                    onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-purple-200"
                  />
                  <Input
                    placeholder="Artist"
                    value={newTrack.artist}
                    onChange={(e) => setNewTrack({ ...newTrack, artist: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-purple-200"
                  />
                  <Input
                    placeholder="Audio URL"
                    value={newTrack.url}
                    onChange={(e) => setNewTrack({ ...newTrack, url: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-purple-200"
                  />
                  <Button
                    onClick={handleAddTrack}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Track
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}