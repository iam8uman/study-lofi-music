import { NextApiRequest, NextApiResponse } from "next";

// Sample track data
const tracks = [
  { id: "1", title: "🕊️", url: "/sound/bird_chirping.mp3" },
  { id: "2", title: "⛈", url: "/sound/thundering.mp3" },
  { id: "3", title: "❤️‍🩹", url: "/sound/relaxing.mp3" },
];

// API route handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(tracks);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
