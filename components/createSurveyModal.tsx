import { type FC, useState } from 'react'
import { render } from 'react-dom'
import user from '../lib/user'
import Question from './question'

interface LoginProps {
  setShowCreateSurvey: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateSurveyModal: FC<LoginProps> = ({ setShowCreateSurvey }) => {

  async function handleNewSurvey(e: React.FormEvent<HTMLFormElement>){
    const formData = new FormData(e.currentTarget)
    const surveyName = formData.get('surveyName')
    const surveyDesc = formData.get('surveyDesc')
    const surveyStart = formData.get('surveyStart')
    const surveyEnd = formData.get('surveyEnd')
    
  }

interface QuestionInterface{
  question: string
  type:number
}
  const [questions, setQuestions] = useState<QuestionInterface[]>([])
  return (
    <div id='survey-modal' tabIndex={-1} aria-hidden='true' className='fixed top-0 left-0 right-0 z-50 items-center justify-center w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal mb-2'>
      <div className='relative w-full h-full max-w-xl p-4 m-auto mt-20 md:h-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto'>
            <button onClick={() => setShowCreateSurvey(false)} type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white' data-modal-toggle='survey-modal'>
              <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'></path></svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>Create Survey</h3>
              <form className='space-y-6'>
                <div>
                    <label htmlFor='surveyName' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Survey Name</label>
                    <input type='surveyName' name='surveyName' id='surveyName' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' placeholder='"Survey Name"' required />
                </div>
                <div>
                    <label htmlFor='surveyDesc' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Survey Description</label>
                    <textarea name='surveyDesc' id='surveyDesc' placeholder='ipsum lorem' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' required />
                </div>
                <div>
                    <label htmlFor='surveyStart' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Start Date</label>
                    <input type={"date"} name='surveyStart' id='surveyStart' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' required></input>
                </div>
                <div>
                    <label htmlFor='surveyEnd' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300' >End Date</label>
                    <input type={"date"} name='surveyEnd' id='surveyEnd' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white' required></input>
                </div>
                <div className='flex space-x-2 text-sm font-medium text-gray-500 dark:text-gray-300'>
                    <div onClick={()=> setQuestions(prevState => [...prevState, {question:'',type:1}])} className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px" className="mr-2 -ml-1"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>
                        New Question
                    </div>
                    
                </div>
                <div>
                    {questions.map((question,i) =>(
                      <Question></Question>
                    ))}
                </div>
                <div>
                    <button type="submit" className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 w-full">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px" className="mr-2 -ml-1"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>
                        Submit Survey
                    </button> 
                </div>
              </form>
            </div>
          </div>
        </div>
    </div> 
  )
}

export default CreateSurveyModal