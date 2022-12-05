import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AuthRedirect: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  }, [])

  return null
}

export default AuthRedirect
