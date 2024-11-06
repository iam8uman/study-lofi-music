import { NextResponse } from 'next/server';

// Sample track data
const tracks = [
  { id: "1", title: "🕊️", url: "/sound/bird_chirping.mp3" },
  { id: "2", title: "⛈", url: "/sound/thundering.mp3" },
  { id: "3", title: "❤️‍🩹", url: "/sound/relaxing.mp3" },
  { id: "4", title: "🧘", url: "/sound/meditation.mp3" },
  { id: "5", title: "💻", url: "/sound/keyboard.mp3" },
  { id: "6", title: "🏖", url: "/sound/wildlife.mp3" },
];

export async function GET() {
  return NextResponse.json({
    tracks,
  });
}