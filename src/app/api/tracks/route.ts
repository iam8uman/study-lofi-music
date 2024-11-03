import { NextApiRequest, NextApiResponse } from "next";

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

// API route handler for tracks
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ tracks, alarm, thundering, birdChirping });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
