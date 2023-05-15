import { useState } from "react";
import {FaHistory} from "react-icons/fa";
import NoteHistory from '../components/NoteHistory'

function Aside() {
    const [showHistory, setShowHistory] = useState<boolean>(false)
  return (
    
        showHistory ? <aside className='md:w-[300px] md:border-r-2 border-bdColor md:shrink-0 xs:w-100 xs:border-b-2'>
        <NoteHistory setShowHistory={setShowHistory}/>
      </aside> :
        <div className="w-[50px] h-[50px] text-2xl flex items-center justify-center bg-bdColor rounded-full mt-8 md:ml-8 hover:text-bdColor hover:bg-light cursor-pointer shrink-0 xs:ml-auto xs:mr-8 historyIcon"
        onClick={()=>setShowHistory(true)}
        ><FaHistory/></div>
      
  )
}

export default Aside