import type { NextPage } from 'next'
import Head from 'next/head'
// import { useEffect } from 'react'
import Header from '../components/header'
import SurveyCards from '../components/surveyCards'
// import user from '../lib/user'



const Home: NextPage = () => {
  
  // useEffect(() => {
  //   console.log('hi')
  //   console.log(user)
  // }, [])

  return (
    <>
      <Head>
        <title>Survey</title>
      </Head>

      <Header />

      <main className='h-[calc(100vh-80px-40px)] bg-gray-900'>
        <h1 className='p-4 mb-4 text-5xl font-bold text-center text-red-600'>Home</h1>
        <SurveyCards id={5} surveyDesc="tuikgfh" surveyName='dfghb' start='2022-1-12' end="2022-12-29"/>
      </main>
    </>
  )
}

export default Home
