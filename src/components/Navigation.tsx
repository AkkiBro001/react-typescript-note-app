import {useState} from "react"
import { GiNotebook } from "react-icons/gi"
import {BsSearch} from "react-icons/bs"
import {AiOutlineClose} from "react-icons/ai"
import { useMainContext } from "../context/MainContext"
import { Action } from "../constant/TypeGuides"



function Navigation() {
    const [search, setSearch] = useState<string>("")
    const {state, dispatch} = useMainContext()
    
    

    function handleSerch(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault()
        setSearch(event.target.value);
        dispatch({type: Action.search, payload: {query: event.target.value}})
        
        
    }

    function handleCancelSearch(){
        setSearch("");
        dispatch({type: Action.search, payload: {query: ""}})
    }

    return (
        
        <nav className="px-5 py-5 border-b-2 border-bdColor flex items-center justify-between sm:space-x-6 xs:space-x-3 bg-primary sticky top-0 z-50">
            <a className="logo font-bold uppercase sm:text-3xl xs:text-4xl flex space-x-2" href="/react-typescript-note-app/">
                <span className="text-yellow-200"><GiNotebook /></span>
                <span className="text-yellow-300 sm:block xs:hidden">Note App</span>
            </a>
            <div className="md:w-2/6 sm:w-1/2 xs:w-full relative">
                <input type="text" placeholder="search notes" className="w-full py-2 pl-7 pr-7 rounded-md bg-secondary border-0"
                value= {search}
                onChange={(e)=>handleSerch(e)}
                />
                <button className="flex w-full cursor-default">
                <BsSearch className="absolute left-2 top-3 opacity-50 "/> 
                {search ? <AiOutlineClose className="absolute right-2 top-3 cursor-pointer opacity-50 hover:opacity-100" onClick={handleCancelSearch}/> : null} 
                </button>
                
            </div>
            <button className="button flex items-center justify-center md:rounded-full xs:rounded-lg hover:bg-light hover:text-primary nav-btn"
            onClick={()=>dispatch({type: Action.toggleAddNote})}
            >
                <span className="text-lg">{`${state.toggleAddNote ? "-" : "+"}`}</span>
                <span className="md:block xs:hidden">{`${state.toggleAddNote ? "Hide Add Note" : "Show Add Note"}`}</span>
            <span className="text-light md:hidden xs:block ml-1 text-xl sm-icon"><GiNotebook /></span>
            </button>
        </nav>
    )
}

export default Navigation