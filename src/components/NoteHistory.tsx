import {FaHistory} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai"
import HistoryCard from "./HistoryCard";
import { useMainContext } from "../context/MainContext";

interface Props {
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>
}

function NoteHistory({setShowHistory}:Props) {
  const {state: {noteHistory}} = useMainContext()
  return (
    <div>
        <header className="p-3 bg-bdColor flex items-center justify-between">
            <h1 className="text-xl flex items-center justify-center"><FaHistory/><span className="ml-1">Note History</span></h1>
            <AiOutlineClose className="text-2xl opacity-50 cursor-pointer hover:opacity-100" 
            onClick={()=>setShowHistory(false)}
            />
        </header>
        <section>
          {noteHistory.map(history => <HistoryCard  key={history.id} {...history}/>).reverse()}
        </section>
    </div>
  )
}

export default NoteHistory