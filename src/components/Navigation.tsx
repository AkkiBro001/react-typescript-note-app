import { GiNotebook } from "react-icons/gi"
import {BsSearch} from "react-icons/bs"

function Navigation() {
    return (
        <nav className="px-5 py-5 border-b-2 border-bdColor flex items-center justify-between sm:space-x-6 xs:space-x-3 bg-primary sticky top-0 z-50">
            <a className="logo font-bold uppercase sm:text-3xl xs:text-4xl flex space-x-2" href="/">
                <span className="text-yellow-200"><GiNotebook /></span>
                <span className="text-yellow-300 sm:block xs:hidden">Note App</span>
            </a>
            <form action="" className="sm:w-1/2 xs:w-full relative">
                <input type="text" placeholder="search notes" className="w-full py-2 pl-4 pr-7 rounded-md bg-secondary border-0" />
                <BsSearch className="absolute right-2 top-3 cursor-pointer opacity-50 hover:opacity-100"/>
            </form>
            <button className="button flex items-center justify-center md:rounded-full xs:rounded-lg hover:bg-light hover:text-primary nav-btn">
                <span className="text-lg">+</span>
            <span className="md:block xs:hidden">Add Note</span>
            <span className="text-light md:hidden xs:block ml-1 text-xl sm-icon"><GiNotebook /></span>
            </button>
        </nav>
    )
}

export default Navigation