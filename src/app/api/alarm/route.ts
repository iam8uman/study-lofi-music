import { NextResponse } from 'next/server';
import fs from "fs";
import path from "path";

export async function GET() {
  const alarmPath = path.resolve(process.cwd(), "public", "sounds", "alarm.mp3");

  if (fs.existsSync(alarmPath)) {
    const audioFile = fs.readFileSync(alarmPath);
    return new NextResponse(audioFile, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } else {
    return NextResponse.json(
      { error: "Alarm sound not found" },
      { status: 404 }
    );
  }
}