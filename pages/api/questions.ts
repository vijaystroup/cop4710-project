import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client' 
import user from '../../lib/user'

type Data = {
  email: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { surveyName, surveyDesc, surveyStart, surveyEnd } = req.body

    db.query(`
        INSERT INTO survey_question (survey_id, question, type)\
        VALUES (?, ?, ?, ?, ?)
        `, [surveyName, surveyDesc, surveyStart, surveyEnd, user.id],
        function (error, results, fields) {
            if (error) throw error
            const survey_id = results.insertId
            console.log('survey created')
        }
    )
}
