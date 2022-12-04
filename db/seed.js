import db from './client.js'

const emails = ['t1', 't2', 't3']
const email = emails[2]

// db.query(`
//   INSERT INTO user (email, password)\
//     VALUES (?, ?)
//   `, [email, '123'],
//   function (error, results, fields) {
//     if (error) throw error
//     user_id = results.insertId
//     console.log('user created')       
//   }
// )

// db.query(`
//   INSERT INTO survey (title, description, start, end, user_id)\
//     VALUES (?, ?, ?, ?, ?)
//   `, ['Test 2 Survey', 'This is a test survey', '2020-01-01 00:00:00', '2020-02-02 00:00:00', 17],
//   function (error, results, fields) {
//     if (error) throw error
//     const survey_id = results.insertId
//     console.log('survey created')
//   }
// )

// db.query(`
//   INSERT INTO survey_question (question, type, survey_id)\
//     VALUES (?, ?, ?)
//   `, ['Number?', 1, 4],
//   function (error, results, fields) {
//     if (error) throw error
//     const survey_question_id = results.insertId
//     console.log('survey_question created')
//   }
// )

// db.query(`
//   INSERT INTO survey_response (user_id, survey_question_id, response)\
//     VALUES (?, ?, ?)
//   `, [19, 7, '2'],
//   function (error, results, fields) {
//     if (error) throw error
//     console.log('survey_response created')
//   }
// )

db.end()
