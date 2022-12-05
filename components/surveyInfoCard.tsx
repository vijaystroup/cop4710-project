import { type FC } from 'react'
import Link from 'next/link'

interface surveyInfoInterface {
	id: number,
	title: string,
	desc: string,
	start: string,
	end: string,
	questions: {
		question: string,
		type: number
	}[],
}

const displayQuestion = (question_info: any) => {
	if (question_info.type === 1) {
		return (
			<>
				<li className='text-m text-gray-900 dark:text-white'>
					{question_info.question}
				</li>
				
				{/* <li className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
					
				</li> */}
				<li>OPTION 1</li>
				<li>OPTION 2</li>
				<li>OPTION 3</li>
				<li>OPTION 4</li>
				<li>OPTION 5</li>
			</>
		)
	}

	else {
		return (
			<>
				<li className='text-m text-gray-900 dark:text-white'>
					MAMA MINHA PORRA
				</li>
				
				<li className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
					{question_info.type}
				</li>
			</>
		)
	}
}

const SurveyInfoCard: FC = ({title, desc, questions, start, end}: surveyInfoInterface) => {
		return(
			<div tabIndex={-1} aria-hidden='true' className='bg-gray-900 top-0 left-0 right-0 z-50 items-center justify-center w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
				<div className='relative w-full h-full p-4 m-auto mt-20 md:h-auto'>
					<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
						<div className='px-6 py-6 lg:px-8'>
							<h2 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>{title}</h2>

							<h3 className='text-xl font-medium text-gray-900 dark:text-white'><u>Description</u></h3>
							<p className='block mb-4 text-sm font-medium text-gray-900 dark:text-gray-300'>{desc}</p>
							
							<h3 className='text-xl font-medium text-gray-900 dark:text-white'><u>Questions</u></h3>
							<ol>
								{questions.map((question_info) => {
									return (
										<>
											{displayQuestion(question_info)}
										</>
									)
								})}
							</ol>

							<button className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
									HELLOOOO
							</button>
						</div>
					</div>
				</div>
			</div>
		)
}

export default SurveyInfoCard