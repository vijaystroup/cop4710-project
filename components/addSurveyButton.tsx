import { type FC, useState } from 'react'
import CreateSurveyModal from './createSurveyModal'

const AddSurveyButton: FC = () => {
    const [showSurvey, setShowCreateSurvey] = useState<boolean>(false)
    return(
      <div>
        <button onClick={() => setShowCreateSurvey(true)} className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px" className="mr-2 -ml-1"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/></svg>
        New Survey
        </button>
        <div>
          {showSurvey && <CreateSurveyModal setShowCreateSurvey={setShowCreateSurvey}/>}
        </div>
      </div>
    )
}

export default AddSurveyButton
