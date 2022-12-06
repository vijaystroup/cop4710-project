import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client'

type Data = {
  status: "success" | "error"
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { responses, user_id } = req.body

  for (const response of responses) {
    db.query(
      'INSERT INTO survey_response (user_id, survey_question_id, response)\
        VALUES (?,?,?)',
      [user_id, response.id, response.value],
      (error, results, fields) => {
        if (!error) {
          res.status(200).json({ status: 'success' })
        } else {
          res.status(500).json({ status: 'error' })
        }
      }
    )
  }
}
