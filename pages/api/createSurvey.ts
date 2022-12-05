import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client' 


type Data = {
  status: "success"|"error"
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { surveyName, surveyDesc, surveyStart, surveyEnd, user_id, questions } = req.body
    console.log(req.body.surveyName, surveyDesc, surveyStart, surveyEnd, questions)
    try{
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
            if (error) {
             res.status(500).json({status: 'error' })
              throw error
            }
            const question_id = results.insertId
            console.log('question created')
          }
     )
    }
    res.status(200).json({status: 'success' })
    } catch{
      res.status(500).json({status: 'error' })
    }
    
}
