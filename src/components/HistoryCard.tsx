import { SingleHistory } from "../constant/TypeGuides"


function HistoryCard({history, timeStamp, noteColor}: SingleHistory) {
  
  return (
    <>
    <div className={`p-3 bg-${noteColor}-200 text-primary rounded-md m-2`}>
      <div>{history}</div>
      <span className="text-gray-700 text-sm opacity-50 text-right w-100 block mt-2">{timeStamp}</span>
    </div>
    </>
  )
}

export default HistoryCard