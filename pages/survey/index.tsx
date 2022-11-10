import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/header'

const Surveys: NextPage = () => {
  return (
    <>
      <Head>
        <title>Surveys - Survey</title>
      </Head>

      <Header />

      <main className='h-[calc(100vh-80px-40px)] bg-gray-900'>
        <h1 className='text-red-600'>Surveys</h1>
      </main>
    </>
  )
}

export default Surveys
