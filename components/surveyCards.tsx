import { type FC } from 'react'
import Link from 'next/link'

interface surveyCardInterface {
    surveyName: string
    surveyDesc: string
    id: number
}

const SurveyCards: FC = ({surveyName, surveyDesc, id}: surveyCardInterface) => {
    return(
        <Link href={`/survey/${id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{surveyName}</h5>
            <p className="font-normal text-gray-600 dark:text-gray-400">{surveyDesc}</p>
        </Link>
    )
}

export default SurveyCards