import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client' 


type Data = {
  email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { surveyName, surveyDesc, surveyStart, surveyEnd, user_id, questions } = req.body
    console.log(req.body.surveyName, surveyDesc, surveyStart, surveyEnd, questions)
    const results = await db.awaitQuery(`
        INSERT INTO survey (title, description, start, end, user_id)\
        VALUES (?, ?, ?, ?, ?)
    `, [surveyName, surveyDesc, surveyStart, surveyEnd, user_id]
    )
    console.log(results.insertId)
  for(const question of questions){
    db.query(`
        INSERT INTO survey_question (survey_id, question, type)\
        VALUES (?, ?, ?)
        `, [results.insertId, question.question, question.type],
        function (error, results) {
            if (error) throw error
            const question_id = results.insertId
            console.log('question created')
        }
    )
  }
}
