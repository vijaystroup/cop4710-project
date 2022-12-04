import { type FC } from 'react'

interface surveyCardInterface {
    surveyName:String,
    surveyDesc:String,
    responseCount:Number
}

const SurveyCards = ({surveyName, surveyDesc, responseCount}: surveyCardInterface) => {
    return(
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{surveyName}</h5>
            <p className="font-normal text-gray-600 dark:text-gray-400">{surveyDesc}</p>
            <div>
                <text className='font-normal text-gray-600 dark:text-gray-200'>Response Count: </text>
                <text className='font-normal text-gray-600 dark:text-gray-200'>{responseCount.toString()}</text>
            </div>
        </a>
    )
}

export default SurveyCards