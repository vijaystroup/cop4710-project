import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client' 

type Data = {
    status: "success"|"error"
  }
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ){
    const { responses, user_id } = req.body
    // responses: { question_id: number, response: string }[]
    try{
        for(const response of responses){
            const results = await db.awaitQuery(
                'INSERT INTO survey_response (user_id, survey_question_id, response)\
                VALUES (?,?,?)',
                [user_id, response.question_id ,response.response]
            )
        }
        res.status(200).json({status: 'success' })
    } catch{
        res.status(500).json({status: 'error' })
    }
  }