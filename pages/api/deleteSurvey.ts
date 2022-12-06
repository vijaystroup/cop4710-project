import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../db/client' 


type Data = {
  status: "success"|"error"
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

	const { survey_id, questions_ids } = req.body
	console.log(req.body, survey_id, questions_ids)

	try {
		const results = await db.awaitQuery(`
			DELETE FROM survey \
			WHERE (id = ?)
		`, [survey_id]
		)

		res.status(200).json({status: 'success' })
	} catch{
		res.status(500).json({status: 'error' })
	}
}