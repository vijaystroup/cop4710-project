import { type FC } from 'react'

const Question: FC = () => {
    return(
      <div className="relative w-full lg:max-w-sm">
        <div>
            <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-5' placeholder='Question' required></input>
        </div>
        <div className="pb-5">
            <select className="w-8/12 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
              <option>Question Type 1</option>
              <option>Question Type 2</option>
          </select>
        </div>
      </div>
    )
}

export default Question