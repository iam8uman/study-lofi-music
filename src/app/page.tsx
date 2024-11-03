"use client";

import { useEffect, useState } from "react";
import { Track } from "@/hooks/useAudioPlayer";
import { BackgroundGif } from "@/components/BackgroundGif";
import { MusicControls } from "@/components/MusicControl";
import { VolumeControl } from "@/components/VolumeControl";
import { PlaylistControl } from "@/components/PlaylistControl";
import { Timer } from "@/components/Timer";

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1);

  // Fetch and cache tracks from the API
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const cachedTracks = localStorage.getItem("audioTracks");
        if (cachedTracks) {
          setTracks(JSON.parse(cachedTracks));
          return;
        }

        const response = await fetch("/api/tracks", {
          cache: "force-cache",
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        localStorage.setItem("audioTracks", JSON.stringify(data));
        setTracks(data);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        // Fallback tracks if API fails
        const fallbackTracks = [
          { id: "1", title: "🕊️", url: "/sound/bird_chirping.mp3" },
          { id: "2", title: "⛈", url: "/sound/thundering.mp3" },
          { id: "3", title: "❤️‍🩹", url: "/sound/relaxing.mp3" },
        ];
        setTracks(fallbackTracks);
      }
    };
    fetchTracks();
  }, []);

  // Initialize and manage audio
  useEffect(() => {
    if (tracks.length > 0) {
      const track = tracks[currentTrackIndex];
      const newAudio = new Audio(track.url);
      newAudio.volume = volume;
      setAudio(newAudio);

      // Add autoplay
      newAudio.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error("Autoplay failed:", error));

      newAudio.addEventListener("ended", handleNextTrack);
      return () => {
        newAudio.removeEventListener("ended", handleNextTrack);
        newAudio.pause();
      };
    }
  }, [currentTrackIndex, tracks]);

  // Handle Play/Pause
  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Volume Control
  useEffect(() => {
    if (audio) audio.volume = volume;
  }, [volume, audio]);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-900 text-gray-100">
      <BackgroundGif />
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-[2px]">
        <div className="container mx-auto px-4 py-8 flex flex-col h-full">
          <header className="text-center mb-12">
            <h1 className="text-7xl font-bold text-white mb-4 tracking-tight font-mono">
              Lo-Fi Study Music
            </h1>
            <p className="text-2xl text-purple-600">Focus, Relax, and Study</p>
          </header>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            <MusicControls
              isPlaying={isPlaying}
              togglePlayPause={handlePlayPause}
              nextTrack={handleNextTrack}
              previousTrack={handlePreviousTrack}
              currentTrack={tracks[currentTrackIndex]}
            />
            <div className="relative top-24 left-32">
              <VolumeControl setVolume={setVolume} />
            </div>
            <div className="relative -top-24 left-32">
              <PlaylistControl
                playlist={tracks}
                addToPlaylist={(track) => setTracks((prev) => [...prev, track])}
                removeFromPlaylist={(id) =>
                  setTracks((prev) => prev.filter((track) => track.id !== id))
                }
              />
            </div>
            <div className="relative top-[14rem] left-20">
              <Timer />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
