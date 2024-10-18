import Image from 'next/image'

export function BackgroundGif() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXZ2OGN3OGQ1amttcXl5c2lpNHEwdTh5NmN0dnYwN3VvYjNhNW1hcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6XX4V0O8a0xdS/giphy.gif"
        alt="Lo-fi study background"
        layout="fill"
        objectFit="contain"
        quality={100}
        priority
      />
    </div>
  )
}