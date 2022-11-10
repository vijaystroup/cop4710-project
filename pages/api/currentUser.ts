import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  email: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // TODO: Get the user from the database
  res.status(200).json({ email: 'john.doe@eaxmple.com' })
}
