import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client'

type Data = {
  email: string
  status: 'success' | 'error'
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password, pfpUrl } = req.body

  db.query(`
    INSERT INTO user (email, password)\
    VALUES (?, ?)\
  `, [email, password],
    (error, results, fields) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ email, status: 'error' })
        } else {
          res.status(500).json({ email, status: 'error' })
        }
      } else {
        res.status(200).json({ email, status: 'success' })
      }
    }
  )
}
