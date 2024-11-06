import { NextResponse } from 'next/server';

const birdChirping = [
    { id: "1", title: "🕊️", url: "/sound/bird_chirping.mp3" },
  ];

export async function GET() {
  return NextResponse.json({
    birdChirping,
  });
}