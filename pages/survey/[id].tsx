import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '../../components/header'

const Survey: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>{id} - Survey</title>
      </Head>

      <Header />

      <main className='h-[calc(100vh-80px-40px)] bg-gray-900'>
        <h1 className='text-red-600'>Survey {id}</h1>
      </main>
    </>
  )
}

export default Survey
