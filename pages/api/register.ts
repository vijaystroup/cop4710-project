import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
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
    async (error, results, fields) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ email, status: 'error' })
        } else {
          res.status(500).json({ email, status: 'error' })
        }
      } else {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          }
        })

        const info = await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email, // list of receivers
          subject: 'Survey Signup', // Subject line
          text: 'Thank you for signing up to 📋 Survey!', // plain text body
        })

        console.log('Message sent: %s', info.messageId)

        res.status(200).json({ email, status: 'success' })
      }
    }
  )
}
