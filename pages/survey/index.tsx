import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/header'
import SurveyCards from '../../components/surveyCards'
import db from '../../db/client'
import user from '../../lib/user'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const results = await db.awaitQuery(
    `SELECT *\
    FROM survey`
  )

  console.log('User ID: ' + user.id);
  
  console.log(results);

  return {
    props: {
      surveys: results.map((survey) => {
        return {
          id: survey.id,
          title: survey.title,
          description: survey.description,
          start: survey.start.toString(),
          end: survey.end.toString(),
        }
      })
    }
  }
}

interface SurveysProps {
  surveys: {
    id: number
    title: string
    description: string
    start: string
    end: string
  }[]
}

const Surveys: NextPage<SurveysProps> = (props) => {
  return (
    <>
      <Head>
        <title>Surveys - Survey</title>
      </Head>

      <Header />

      {user.email &&  
      <main className='h-[calc(100vh-80px-40px)] bg-gray-900 px-10'>
        <h1 className='p-4 mb-4 text-5xl font-bold text-center text-red-600'>Surveys</h1>

        <div className='flex flex-wrap justify-center gap-4'>
          {props.surveys.map((survey) => {
            return (
              <SurveyCards
                key={survey.id}
                surveyName={survey.title}
                surveyDesc={survey.description}
                id={survey.id}
              />
            )
          })}
        </div>  
      </main> }
    </>
  )
}

export default Surveys
