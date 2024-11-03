import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

export function Timer() {
  const [time, setTime] = useState(7 * 60); // 7 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [alarmAudio, setAlarmAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Fetch alarm sound from the backend
    const fetchAlarmSound = async () => {
      try {
        const response = await fetch("/api/alarm", { cache: "no-store", method: "GET" });
        console.log(response,"response")
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
    <div className="flex flex-col items-center space-y-6 py-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-purple-400">Study Timer</h2>
      <div className="text-6xl font-bold text-purple-300 transition-transform duration-500 ease-out">
        {time === 0 ? (
          <span className="animate-pulse text-red-500">{formatTime(time)}</span>
        ) : (
          formatTime(time)
        )}
      </div>
      <div className="flex space-x-3 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTimer}
          className="px-4 py-2 text-purple-300 border-purple-300 hover:bg-purple-700 hover:text-white"
        >
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetTimer}
          className="px-4 py-2 text-purple-300 border-purple-300 hover:bg-purple-700 hover:text-white"
        >
          Reset
        </Button>
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <Clock className="h-6 w-6 text-purple-300" />
        <Input
          type="number"
          min="1"
          max="60"
          value={Math.floor(time / 60)}
          onChange={(e) => setTime(parseInt(e.target.value) * 60)}
          className="w-16 text-center bg-gray-800 border-gray-700 text-purple-200"
        />
        <span className="text-purple-300">min</span>
      </div>
    </div>
  );
}
