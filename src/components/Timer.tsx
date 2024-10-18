import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock } from "lucide-react"

export function Timer() {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(25 * 60)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold text-purple-300">Study Timer</h3>
      <div className="text-4xl font-bold text-purple-200">{formatTime(time)}</div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={toggleTimer} className="text-purple-300 border-purple-300 hover:bg-purple-800 hover:text-purple-100">
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button variant="outline" size="sm" onClick={resetTimer} className="text-purple-300 border-purple-300 hover:bg-purple-800 hover:text-purple-100">
          Reset
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-purple-300" />
        <Input
          type="number"
          min="1"
          max="60"
          value={Math.floor(time / 60)}
          onChange={(e) => setTime(parseInt(e.target.value) * 60)}
          className="w-16 text-center bg-gray-700 border-gray-600 text-purple-200"
        />
        <span className="text-purple-300">min</span>
      </div>
    </div>
  )
}