import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const alarmPath = path.resolve(process.cwd(), "public", "sounds", "alarm.mp3");

    if (fs.existsSync(alarmPath)) {
      res.setHeader("Content-Type", "audio/mpeg");
      fs.createReadStream(alarmPath).pipe(res);
    } else {
      res.status(404).json({ error: "Alarm sound not found" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
