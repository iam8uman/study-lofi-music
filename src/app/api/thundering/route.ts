import { NextResponse } from 'next/server';

const thundering = [
    { id: "1", title: "⛈", url: "/sound/thundering.mp3" },
];

export async function GET() {
  return NextResponse.json({
    thundering,
  });
}