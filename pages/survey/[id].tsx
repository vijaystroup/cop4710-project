import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Survey: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>{id} - Survey</title>
      </Head>

      <h1 className='text-red-600'>Survey {id}</h1>
    </>
  )
}

export default Survey
