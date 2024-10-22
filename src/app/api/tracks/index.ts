import { NextApiRequest, NextApiResponse } from 'next'

const tracks = [
  { id: 1, title: 'Lo-Fi Beats', url: '/sounds/lofi.mp3' },
  { id: 2, title: 'Study Vibes', url: '/sounds/study.mp3' },
  { id: 3, title: 'Chill Out', url: '/sounds/chill.mp3' },
]

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(tracks)
}

export default handler
