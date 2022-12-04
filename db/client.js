import mysql from 'mysql-await'
import * as dotenv from 'dotenv'
dotenv.config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  ssl: true
})

db.connect()

export default db
