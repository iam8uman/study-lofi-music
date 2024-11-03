import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function BackgroundGif() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="relative h-screen">
      <Image
        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXZ2OGN3OGQ1amttcXl5c2lpNHEwdTh5NmN0dnYwN3VvYjNhNW1hcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6XX4V0O8a0xdS/giphy.gif"
        alt="Lo-fi study background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      {/* Dark overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'bg-black opacity-70' : 'bg-transparent opacity-0'}`}
      />
      <Button onClick={toggleTheme} className="absolute top-4 right-4 z-10 bg-transparent rounded-3xl bg-gray-800 bg-opacity-60  shadow-lg backdrop-blur-sm border-2 border-pink-300 shadow-neon flex items-center justify-center transition-all duration-300 group-hover:w-48 group-hover:h-12 group-hover:shadow-neon-lg">
        {isDarkMode ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
