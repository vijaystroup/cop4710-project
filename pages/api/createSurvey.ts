import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client' 

type Data = {
  email: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { surveyName, surveyDesc, surveyStart, surveyEnd, userId } = req.body

    db.query(`
        INSERT INTO survey (title, description, start, end, user_id)\
        VALUES (?, ?, ?, ?, ?)
    `, [surveyName, surveyDesc, surveyStart, surveyEnd, userId],
  function (error, results, fields) {
    if (error) throw error
    const survey_id = results.insertId
    console.log('survey created')
  }
)
}
