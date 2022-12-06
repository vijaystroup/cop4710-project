import { type FC } from 'react'

interface questionInfo {
	question: string,
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
					{question}
				</li>

				<div className="mb-4 form-check">
					{owner && <p className='text-lg text-white'>Average: {avg}</p>}
					{!owner && <input type="number" className='mb-4' placeholder='1' min={1} max={5}/>}
    		</div>
			</>
		)
	}

	else {
		console.log(responses)
		return (
			<>
				<li className='font-bold text-gray-900 text-m dark:text-white'>
					{question}
				</li>
				
				<li className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
					<textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
						placeholder="Write your thoughts here...">
					</textarea>
				</li>
			</>
		)
	}
}

export default DisplayQuestion