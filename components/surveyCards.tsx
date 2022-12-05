import { type FC } from 'react'
import Link from 'next/link'

interface surveyCardInterface {
    surveyName: string
    surveyDesc: string
    id: number
    start: string
    end:string
}

const SurveyCards: FC <surveyCardInterface> = ({surveyName, surveyDesc, id, start, end} ) => {
    
    const startDate = new Date(start)
    const endDate = new Date(end)
    const currentDate = new Date(new Date().toISOString().slice(0, 19).replace('T', ' '))
    const active = startDate <= currentDate && currentDate <= endDate
    return(
        <Link href={`/survey/${id}`} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex items-center justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{surveyName}</h5>
                <p className={`font-normal text-gray-600 dark:text-white rounded px-2 ${active ? 'bg-green-500/30' : 'bg-red-500/30'}`}>{active ? 'Status: Active' : 'Status: Finished'}</p>
            
            </div>
            <p className="font-normal text-gray-600 dark:text-gray-400">{surveyDesc}</p>
            <div className="flex items-center justify-between space-x-10">
                <p className="font-normal text-gray-600 dark:text-white">Start: {new Date(start).toLocaleDateString("en-US")}</p>
                <p className="font-normal text-gray-600 dark:text-white">End: {new Date(end).toLocaleDateString("en-US")}</p>
            </div>
        </Link>
    )
}

export default SurveyCards