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
    const { survey_id, question, type } = req.body

    db.query(`
        INSERT INTO survey_question (survey_id, question, type)\
        VALUES (?, ?, ?)
        `, [survey_id, question, type],
        function (error, results) {
            if (error) throw error
            const question_id = results.insertId
            console.log('question created')
        }
    )
}
