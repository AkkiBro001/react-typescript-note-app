
import {FaHistory} from "react-icons/fa";
import {AiOutlineClose, AiOutlineClear} from "react-icons/ai"
import HistoryCard from "./HistoryCard";
import { useMainContext } from "../context/MainContext";
import { Action } from "../constant/TypeGuides";

interface Props {
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>
}



function NoteHistory({setShowHistory}:Props) {
  const {state: {noteHistory}, dispatch} = useMainContext()

  function handleClearHistory(){
    dispatch({type: Action.clearHistory})
  }
  
  return (
    <div>
        <header className="p-3 bg-bdColor flex items-center justify-between">
            <h1 className="text-xl flex items-center justify-center"><FaHistory/><span className="ml-1">Note History</span></h1>
            <div className="flex space-x-2 items-center">
            <AiOutlineClear 
            className="text-2xl opacity-50 hover:opacity-100 cursor-pointer relative overflow-visible" 
            title="Clear History"
            onClick={()=> handleClearHistory()}
            />
            <AiOutlineClose className="text-2xl opacity-50 cursor-pointer hover:opacity-100"  title="Close History Panel"
            onClick={()=>setShowHistory(false)}/>
            </div>
        </header>
        <section>
          
          {noteHistory.map(history => <HistoryCard  key={history.id * Math.random()} {...history}/>).reverse()}
        </section>
    </div>
  )
}

export default NoteHistory