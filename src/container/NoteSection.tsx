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
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </div>
    </section>
    
  )
}

export default NoteSection