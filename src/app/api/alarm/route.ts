import { NextResponse } from 'next/server';

const alarm = [
  { id: "1", title: "🔔", url: "/sound/alarm.mp3" },
];

export async function GET() {
  return NextResponse.json({
    alarm,
  });
}