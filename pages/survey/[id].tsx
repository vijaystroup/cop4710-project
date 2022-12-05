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
    }
  }
}

interface SurveyProps {
  id: number,
  title: string,
  description: string,
  start: string
  end: string,
  questions: {question: string, type: number}[],
}

const Survey: NextPage<SurveyProps> = (props) => {

  return (
    <>
      <Head>
        <title>{props.title} - Survey</title>
      </Head>

      <Header />

      <SurveyInfoCard
        key={Math.random()}
        id={props.id}
        title={props.title}
        desc={props.description}
        questions={props.questions}
        start={props.start}
        end={props.end}
      />
    </>
  )
}

export default Survey
