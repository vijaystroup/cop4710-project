import { type FC, useState } from 'react'

interface LoginProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Login: FC<LoginProps> = ({ setShowLogin }) => {
  const [loginOrRegister, setLoginOrRegister] = useState<'login' | 'register'>('login')

  async function handleLoginOrRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    if (loginOrRegister === 'login') { // login
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await res.json()

      if (data.status === 'success') {
        setShowLogin(false)
      } else {
        alert('Invalid credentials.')
      }
    } else { // register
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          pfpUrl: `https://robohash.org/${email}`
        })
      })
      const data = await res.json()

      if (res.status === 400)  {
        alert('Email already exists')
      } else if (res.status === 500) {
        alert('Something went wrong.')
      } else {
        alert('Successfully registered. Please Login.')
        setLoginOrRegister('login')
      }
    }
  }

  return (
    <div id='authentication-modal' tabIndex={-1} aria-hidden='true' className='fixed top-0 left-0 right-0 z-50 items-center justify-center w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
      <div className='relative w-full h-full max-w-md p-4 m-auto mt-20 md:h-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button onClick={() => setShowLogin(false)} type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white' data-modal-toggle='authentication-modal'>
              <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'></path></svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>{loginOrRegister === 'login' ? 'Login' : 'Register'}</h3>
              <form className='space-y-6' onSubmit={handleLoginOrRegister}>
                  <div>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Your email</label>
                    <input type='email' name='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' placeholder='name@company.com' required />
                  </div>
                  <div>
                    <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Your password</label>
                    <input type='password' name='password' id='password' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' required />
                  </div>
                  <button type='submit' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>{loginOrRegister === 'login' ? 'Login to your account' : 'Register account'}</button>
                  <div className='flex space-x-2 text-sm font-medium text-gray-500 dark:text-gray-300'>
                    
                    {loginOrRegister === 'login' && (<><p>Not registered?</p><a onClick={() => setLoginOrRegister('register')} className='text-blue-700 cursor-pointer hover:underline dark:text-blue-500'>Create account</a></>)}
                    {loginOrRegister === 'register' && (<><p>Already have an account?</p><a onClick={() => setLoginOrRegister('login')} className='text-blue-700 cursor-pointer hover:underline dark:text-blue-500'>Login</a></>)}
                  </div>
              </form>
            </div>
          </div>
        </div>
    </div> 
  )
}

export default Login
