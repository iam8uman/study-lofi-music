import { Slider } from "@/components/ui/slider"
import { Volume2 } from "lucide-react"

interface VolumeControlProps {
  setVolume: (volume: number) => void
}

export function VolumeControl({ setVolume }: VolumeControlProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-lg font-semibold text-purple-300">Volume</h3>
      <div className="flex items-center space-x-4 w-full">
        <Volume2 className="h-6 w-6 text-purple-300" />
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0] / 100)}
          className="w-full"
        />
      </div>
    </div>
  )
}