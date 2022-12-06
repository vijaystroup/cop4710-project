import { type FC } from 'react'
import DisplayQuestion from '../components/displayQuestion'

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

const deleteSurvey = async (survey_id) => {
	const res = await fetch('/api/deleteSurvey', {
    method: 'DELETE',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
			survey_id,
    })
  })
  const resData = await res.json()
	console.log(resData);
}

const SurveyInfoCard: FC = ({id, title, desc, questions, start, end}: surveyInfoInterface) => {
		
	const startDate = new Date(start)
	const endDate = new Date(end)
	const currentDate = new Date(new Date().toISOString().slice(0, 19).replace('T', ' '))
	const isActive = startDate <= currentDate && currentDate <= endDate

	return(
			<div tabIndex={-1} aria-hidden='true' className='bg-gray-900 top-0 left-0 right-0 z-50 items-center justify-center w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
				<div className='relative w-full h-full p-4 m-auto mt-20 md:h-auto'>
					<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
						<div className='px-6 py-6 lg:px-8'>

							<div className='flex justify-end'>
								<p className={`text-m w-auto font-normal text-gray-600 dark:text-white rounded px-2 ${isActive ? 'bg-green-500/30' : 'bg-red-500/30'}`}>{isActive ? 'Active' : 'Finished'}</p>
							</div>

							<h2 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>{title}</h2>


							<h3 className='text-xl font-medium text-gray-900 dark:text-white'><u>Description</u></h3>
							<p className='block mb-4 text-sm font-medium text-gray-900 dark:text-gray-300'>{desc}</p>
							
							<h3 className='text-xl font-medium text-gray-900 dark:text-white'><u>Questions</u></h3>
							<ol>
								{questions.map((question_info, i) => {
									return (
										<>
											<DisplayQuestion 
												key={i}
												question={question_info.question}
												type={question_info.type}
											/> 
										</>
									)
								})}
							</ol>

							<div className='flex justify-center'>
								<button className='m-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
									Submit
								</button>

								<button onClick={() => deleteSurvey(id)} className='m-4 w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
									Delete
								</button> 
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}

export default SurveyInfoCard