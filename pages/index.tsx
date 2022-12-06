import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import AddSurveyButton from '../components/addSurveyButton'
import Header from '../components/header'
import SurveyCards from '../components/surveyCards'
import user from '../lib/user'

const Home: NextPage = () => {
  const [surveys, setSurveys] = useState<{
    id: number
    title: string
    description: string
    start: string
    end: string
  }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/getUserSurveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.id })
      })
      const data = await res.json()
      return data
    }

    fetchData().then(data => setSurveys(data.data))
  }, [])

  return (
    <>
      <Head>
        <title>Survey</title>
      </Head>

      <Header />

      <main className='h-[calc(100vh-80px-40px)] bg-gray-900 px-10'>
        {!user.email && <h1 className='p-4 mb-4 text-5xl font-bold text-center text-red-600'>Sign in to get started!</h1>}
        {user.email && <h1 className='p-4 mb-4 text-5xl font-bold text-center text-red-600'>Welcome, {user.email.split('@')[0]}!</h1>}
        {user.email && <AddSurveyButton />}
        {surveys && 
          <div className='flex flex-wrap justify-center gap-4'>
            {surveys.map(survey => {
              return (
                <SurveyCards
                  key={survey.id}
                  surveyName={survey.title}
                  surveyDesc={survey.description}
                  id={survey.id}
                  start={survey.start}
                  end={survey.end}
                />
              )
            })}
          </div>
        }
      </main>
    </>
  )
}

export default Home
