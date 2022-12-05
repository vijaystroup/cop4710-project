import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client'

type Data = {
  email: string
  id: number
  status: 'success' | 'error'
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body

  db.query(`
    SELECT id, email FROM user WHERE email=? AND password=?
  `, [email, password],
    (error, results, fields) => {
      if (results.length > 0) {
        res.status(200).json({ email: results[0].email, id: results[0].id, status: 'success' })
      } else {
        res.status(404).json({ email: '', id: -1, status: 'error' })
      }
    }
  )
}
