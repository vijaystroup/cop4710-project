import db from './client.js'

// db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error
//   console.log('The solution is: ', results[0].solution)
// })

db.query(`
  CREATE TABLE IF NOT EXISTS user (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    email VARCHAR(255) UNIQUE NOT NULL,\
    password VARCHAR(255) NOT NULL\
  )`,
  function (error, results, fields) {
    if (error) throw error
    console.log('user table created')
  }
)

db.query(`
  CREATE TABLE IF NOT EXISTS survey (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    title VARCHAR(255) NOT NULL,\
    description VARCHAR(255) NOT NULL,\
    start DATETIME NOT NULL,\
    end DATETIME NOT NULL,\
    user_id INT NOT NULL,\
    FOREIGN KEY (user_id) REFERENCES user(id)\
  )`,
  function (error, results, fields) {
    if (error) throw error
    console.log('survey table created')
  }
)

db.query(`
  CREATE TABLE IF NOT EXISTS survey_question (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    question VARCHAR(255) NOT NULL,\
    type INT NOT NULL,\
    survey_id INT NOT NULL,\
    FOREIGN KEY (survey_id) REFERENCES survey(id)\
  )`,
  function (error, results, fields) {
    if (error) throw error
    console.log('survey_question table created')
  }
)

db.query(`
  CREATE TABLE IF NOT EXISTS survey_response (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    user_id INT NOT NULL,\
    FOREIGN KEY (user_id) REFERENCES user(id),\
    survey_question_id INT NOT NULL,\
    FOREIGN KEY (survey_question_id) REFERENCES survey_question(id),\
    response VARCHAR(255) NOT NULL,\
    CONSTRAINT user_survey_question_response UNIQUE(user_id, survey_question_id)\
  )`,
  function (error, results, fields) {
    if (error) throw error
    console.log('survey_response table created')
  }
)

// db.query(`
//   CREATE TABLE IF NOT EXISTS survey_email (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     survey_id INT NOT NULL,
//     FOREIGN KEY (survey_id) REFERENCES survey(id)
//     email VARCHAR(255) NOT NULL
//     UNIQUE (survey_id, email)
//   )`,
//   function (error, results, fields) {
//     if (error) throw error
//     console.log('survey_email table created')
//   }
// )

db.end()
