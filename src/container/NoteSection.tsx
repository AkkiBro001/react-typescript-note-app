import AddNote from "../components/AddNote"
import NoteCard from "../components/NoteCard"
import { useMainContext } from "../context/MainContext"

function NoSearchResult () {
  return <div className="flex flex-col items-center mt-10">
  <h2 className="text-3xl">Oops!!! No result found</h2>
  <button className="bg-yellow-200 py-2 px-4 text-xl mt-5 text-primary font-bold rounded-md hover:bg-yellow-400">Show All Notes</button>
</div>
}


function NoteSection() {
  const {state} = useMainContext()
  
  
  return (
    
    <section className="p-8 w-full">
          {state.toggleAddNote && <AddNote />}
          <div className="flex flex-wrap justify-center">
            {
              state.searchQuery && state.filterList.length === 0 ? <NoSearchResult/> : state.searchQuery && state.filterList.length > 0 ? state.filterList.map(note => <NoteCard key={note.id} id={note.id} title={note.title} note={note.note} noteColor={note.noteColor}/>)
              : state.noteList.map(note => <NoteCard key={note.id} id={note.id} title={note.title} note={note.note} noteColor={note.noteColor}/>)
            }
            
            
            
          </div>

          
    </section>
    
  )
}

export default NoteSection