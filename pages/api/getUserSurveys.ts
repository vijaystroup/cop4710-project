import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client'

type Data = {
  status: 'success' | 'error'
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { user_id } = req.body

  const results = await db.awaitQuery(`SELECT * FROM survey WHERE user_id=?`, [user_id])
  res.status(200).json({ status: 'success', data: results })
}
