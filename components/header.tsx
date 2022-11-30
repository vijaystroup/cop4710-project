import Link from 'next/link'
import { useRouter } from 'next/router'
import { type FC, useState, useEffect } from 'react'
import Login from './login'
import user from '../lib/user'

const Header: FC = () => {
  const router = useRouter()
  const route = router.pathname
  const [showLogin, setShowLogin] = useState<boolean>(false)

  return (
    <header className='pb-10 bg-gray-900'>
      <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900'>
        <div className='container flex flex-wrap items-center justify-between mx-auto'>
          <Link href='/' className='flex items-center'>
            <img
              src='/checklist.png'
              className='h-6 mr-3 sm:h-9'
              alt='Flowbite Logo'
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              Survey
            </span>
          </Link>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          <div
            className='hidden w-full md:block md:w-auto'
            id='navbar-default'
          >
            <ul className='flex flex-col items-center p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <Link
                  href='/'
                  className={`block py-2 pl-3 pr-4 text-gray-500 ${route === '/' ? 'text-blue-500 dark:text-blue-500' : 'hover:text-white'} md:p-0`}
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/survey'
                  className={`block py-2 pl-3 pr-4 text-gray-500 ${route === '/survey' ? 'text-blue-500 dark:text-blue-500' : 'hover:text-white'} md:p-0`}
                >
                  Surveys
                </Link>
              </li>
              <li>
                {user.email && <img className='w-10 h-10 rounded-full' src={`https://robohash.org/${user}`} alt='Rounded avatar' />}
                {!user.email && <Link
                    href={route}
                    className={`block py-1 px-3 bg-white rounded text-blue-500`}
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showLogin && <Login setShowLogin={setShowLogin} />}
    </header>
  )
}

export default Header
