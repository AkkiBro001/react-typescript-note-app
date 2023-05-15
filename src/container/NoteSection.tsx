import AddNote from "../components/AddNote"
import NoteCard from "../components/NoteCard"


function NoteSection() {
  return (
    
    <section className="p-8 w-full">
          <AddNote />
          <div className="flex flex-wrap justify-center">
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            
          </div>

          {/* <div className="flex flex-col items-center mt-10">
              <h2 className="text-3xl">Oops!!! No result found</h2>
              <button className="bg-yellow-200 py-2 px-4 text-xl mt-5 text-primary font-bold rounded-md hover:bg-yellow-400">Show All Notes</button>
          </div> */}
    </section>
    
  )
}

export default NoteSection