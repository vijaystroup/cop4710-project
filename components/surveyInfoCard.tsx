import { useRouter } from 'next/router'
import { type FC } from 'react'
import DisplayQuestion from '../components/displayQuestion'
import user from '../lib/user'

interface surveyInfoInterface {
	id: number,
	title: string,
	desc: string,
	start: string,
	end: string,
	questions: {
		question: string,
		id: number,
		type: number
	}[],
	responses: {
		survey_question_id: number,
		response: string
	}[],
	creator: number
}

const SurveyInfoCard: FC<surveyInfoInterface> = ({title, desc, questions, responses, start, end, creator}) => {
	const router = useRouter()
	const startDate = new Date(start)
	const endDate = new Date(end)
	const currentDate = new Date(new Date().toISOString().slice(0, 19).replace('T', ' '))
	const isActive = startDate <= currentDate && currentDate <= endDate
	const owner = user.id === creator
  
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

	async function submitSurvey(e) {
		e.preventDefault()

		const numberInputElements = document.getElementsByTagName('input')
		const textInputElements = document.getElementsByTagName('textarea')

		const numberInputs = Array.from(numberInputElements).map(e => ({id: e.name.split('_')[1], value: e.value.valueOf()}))
		const textInputs = Array.from(textInputElements).map(e => ({id: e.name.split('_')[1], value: e.value.valueOf()}))

		const res = await fetch('/api/responses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				responses: numberInputs.concat(textInputs),
				user_id: user.id,
			})
		})
		const data = await res.json()
		if (data.status === 'error') {
			alert('There was an error submitting your survey. Please try again.')
			return
		} else {
			alert('Your survey was successfully submitted!')
			router.push('/survey')
		}
	}

	return(
			<div tabIndex={-1} aria-hidden='true' className='top-0 left-0 right-0 z-50 items-center justify-center w-full overflow-x-hidden overflow-y-auto bg-gray-900 md:inset-0 h-modal md:h-full'>
				<div className='relative w-full h-full p-4 m-auto mt-20 md:h-auto'>
					<div className='flex justify-center mb-5'>
						{owner && <button onClick={() => window.print()} className='p-2 text-lg text-white bg-blue-500 rounded'>Save Results</button>}
					</div>
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
												question={{q: question_info.question, id: question_info.id}}
												responses={responses.filter(response => response.survey_question_id === question_info.id).map(response => response.response)}
												type={question_info.type}
												owner={owner}
											/> 
										</>
									)
								})}
							</ol>

							{!owner && user.email && <button onClick={submitSurvey} disabled={!isActive} className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-500 disabled:hover:bg-slate-500 disabled:focus:bg-slate-500'>
								{isActive ? 'Submit' : 'Survey Closed'}
							</button>}

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
