import { NextResponse } from 'next/server';

// Sample track data
const tracks = [
  { id: "1", title: "🕊️", url: "/sound/bird_chirping.mp3" },
  { id: "2", title: "⛈", url: "/sound/thundering.mp3" },
  { id: "3", title: "❤️‍🩹", url: "/sound/relaxing.mp3" },
];

const alarm = [
  { id: "1", title: "🔔", url: "/sound/alarm.mp3" },
];

const thundering = [
  { id: "1", title: "⛈", url: "/sound/thundering.mp3" },
];

const birdChirping = [
  { id: "1", title: "🕊️", url: "/sound/bird_chirping.mp3" },
];

export async function GET() {
  return NextResponse.json({
    tracks,
    alarm,
    thundering,
    birdChirping
  });
}