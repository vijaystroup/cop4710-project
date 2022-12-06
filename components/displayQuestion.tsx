import { type FC } from 'react'

interface questionInfo {
	question: {q: string, id: number},
	responses: string[],
	type: number
	owner: boolean
}

const DisplayQuestion: FC = ({type, question, responses, owner}: questionInfo) => {
	if (type === 1) {
		const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
		const avg = arrAvg(responses.map(c => +c))
 
		return (
			<>
				<li className='font-bold text-gray-900 text-m dark:text-white'>
					{question.q}
				</li>

				<div className="mb-4 form-check">
					{owner && <p className='text-white text-md'>Average: {avg}</p>}
					{!owner && <input required defaultValue={1} type="number" className='mb-4' min={1} max={5} name={`type1q_${question.id}`} />}
    		</div>
			</>
		)
	}

	else {
		return (
			<>
				<li className='font-bold text-gray-900 text-m dark:text-white'>
					{question.q}
				</li>
				
				<li className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
					{!owner && <textarea name={`type2q_${question.id}`} maxLength={200} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
						placeholder="Write your thoughts here...">
					</textarea>}
					{owner && responses.map(res => <p className='text-white text-md'>{'>'} {res}</p>)}
				</li>
			</>
		)
	}
}

export default DisplayQuestion
