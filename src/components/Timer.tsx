import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Play, Pause, RotateCcw } from "lucide-react";

export function Timer() {
  const [time, setTime] = useState(7 * 60); // 7 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [alarmAudio, setAlarmAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Fetch alarm sound from the backend
    const fetchAlarmSound = async () => {
      try {
        const response = await fetch("/api/alarm", { cache: "no-store", method: "GET" });
        if (response.ok) {
          const blob = await response.blob();
          const audioUrl = URL.createObjectURL(blob);
          setAlarmAudio(new Audio(audioUrl));
        } else {
          console.error("Failed to load alarm sound");
        }
      } catch (error) {
        console.error("Error fetching alarm sound:", error);
      }
    };

    fetchAlarmSound();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    } else if (time === 0 && alarmAudio) {
      setIsActive(false);
      alarmAudio.play();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, alarmAudio]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTime(7 * 60);
    if (alarmAudio) alarmAudio.pause();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div className="w-8 h-8 rounded-3xl bg-gray-800 bg-opacity-60 shadow-lg backdrop-blur-sm border-2 border-slate-100 shadow-neon flex items-center justify-center transition-all duration-300 group-hover:w-80 group-hover:h-96 group-hover:shadow-neon-lg">
          <div className="hidden group-hover:flex flex-col items-center space-y-6 w-full p-6">
            <h2 className="text-2xl font-bold text-purple-400 tracking-tight">Focus Timer</h2>
            
            <div className="relative w-48 h-48 rounded-full border-4 border-purple-400 flex items-center justify-center bg-gray-800 bg-opacity-40 shadow-inner">
              <div className="absolute inset-0 rounded-full border-t-4 border-purple-500 animate-spin-slow opacity-20"></div>
              <div className="text-5xl font-bold text-purple-300 tracking-wider filter drop-shadow-glow">
                {time === 0 ? (
                  <span className="animate-pulse text-red-500">{formatTime(time)}</span>
                ) : (
                  formatTime(time)
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTimer}
                className="rounded-full w-12 h-12 text-purple-300 hover:bg-purple-800/50 hover:text-purple-100 transition-colors"
              >
                {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetTimer}
                className="rounded-full w-12 h-12 text-purple-300 hover:bg-purple-800/50 hover:text-purple-100 transition-colors"
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-10 w-10 text-purple-300" />
              <Input
                type="number"
                min="1"
                max="60"
                value={Math.floor(time / 60)}
                onChange={(e) => setTime(parseInt(e.target.value) * 60)}
                className="w-16 text-center bg-gray-700/50 border-gray-600 text-purple-200 focus:ring-purple-500"
              />
              <span className="text-purple-300">min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
