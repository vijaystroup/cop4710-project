import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/header'
import db from '../../db/client.js'
import SurveyInfoCard from '../../components/surveyInfoCard'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const results = await db.awaitQuery(
    `SELECT *\
    FROM survey_question\ 
    INNER JOIN survey\
    ON survey.id = survey_question.survey_id\
    WHERE survey.id = ?`,
    [parseInt(context.query.id as string)]
  );

  const questions = results.map(res => ({ 
    question: res.question, 
    type: res.type 
  }))

  return {
    props: {
      id: results[0].id,
      title: results[0].title,
      end: results[0].end.toString(),
      start: results[0].start.toString(),
      description: results[0].description,
      questions: questions,
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
  creator: number,
}

const Survey: NextPage<SurveyProps> = (props) => {

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
          start={props.start}
          end={props.end}
        />
      </main>
    </>
  )
}

export default Survey
