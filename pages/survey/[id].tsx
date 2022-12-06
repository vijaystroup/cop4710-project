import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/header'
import db from '../../db/client.js'
import SurveyInfoCard from '../../components/surveyInfoCard'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const results = await db.awaitQuery(
    `SELECT *\
    FROM survey_question\ 
    INNER JOIN survey ON survey.id = survey_question.survey_id\
    WHERE survey.id = ?`,
    [parseInt(context.query.id as string)]
  );

  const responses = []
  for (const result of results) {
    const dbresponses = await db.awaitQuery(`
      SELECT *\
      FROM survey_response\
      WHERE survey_question_id = ?`, [result.id]
    )

    for (const dbresponse of dbresponses) {
      responses.push({
        survey_question_id: dbresponse.survey_question_id,
        response: dbresponse.response
      })
    }
  }

  const questions = results.map(res => ({ 
    question: res.question,
    id: res.id, 
    type: res.type
  }))

  console.log(responses)

  return {
    props: {
      id: results[0].id,
      title: results[0].title,
      end: results[0].end.toString(),
      start: results[0].start.toString(),
      description: results[0].description,
      questions: questions,
      responses: responses,
      creator: results[0].user_id
    }
  }
}

interface SurveyProps {
  id: number,
  title: string,
  description: string,
  start: string
  end: string,
  questions: {question: string, type: number}[]
  responses: {question: string, response: string}[]
  creator: number,
}

const Survey: NextPage<SurveyProps> = (props) => {
  console.log(props.creator)
  return (
    <>
      <Head>
        <title>{props.title} - Survey</title>
      </Head>

      <Header />
      <main className='h-[calc(100vh-80px-40px)] bg-gray-900 px-10'>
        <SurveyInfoCard
          key={Math.random()}
          id={props.id}
          title={props.title}
          desc={props.description}
          questions={props.questions}
          responses={props.responses}
          start={props.start}
          end={props.end}
          creator={props.creator}
        />
      </main>
    </>
  )
}

export default Survey
