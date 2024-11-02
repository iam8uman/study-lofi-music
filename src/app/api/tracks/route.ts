import { NextResponse } from 'next/server';

// Sample track data
const tracks = [
  { id: "1", title: "🕊️", url: "/sound/bird_chirping.mp3" },
  { id: "2", title: "⛈", url: "/sound/thundering.mp3" },
  { id: "3", title: "❤️‍🩹", url: "/sound/relaxing.mp3" },
];

// API route handler
export async function GET() {
  try {
    return NextResponse.json(tracks);
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const err = error as { response?: { data?: unknown } };
      return NextResponse.json({ error: err.response?.data }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
