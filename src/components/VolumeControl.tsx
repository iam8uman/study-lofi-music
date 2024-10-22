import { Slider } from "@/components/ui/slider";
import { Volume2 } from "lucide-react";

interface VolumeControlProps {
  setVolume: (volume: number) => void;
}

export function VolumeControl({ setVolume }: VolumeControlProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <div className="w-8 h-8 rounded-3xl bg-gray-800 bg-opacity-60  shadow-lg backdrop-blur-sm border-2 border-slate-100 shadow-neon flex items-center justify-center transition-all duration-300 group-hover:w-48 group-hover:h-12 group-hover:shadow-neon-lg">
          <div className="hidden group-hover:flex flex-col items-center space-y-2 w-full px-4">
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
        </div>
      </div>
    </div>
  );
}