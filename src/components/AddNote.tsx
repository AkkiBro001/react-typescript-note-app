import React, {useRef, useState} from "react";
import { GiNotebook } from "react-icons/gi"

function AddNote() {

  const [note, setNote] = useState<{title: string, note: string}>({title: "", note: ""})
  const [error, setError] = useState<{title: string, note: string, titleError: boolean, noteError: boolean}>({title: "Please enter note title details", note: "Please enter note description details", titleError: false, noteError: false})
  const titleInputRef = useRef<HTMLInputElement>(null)
  const noteInputRef = useRef<HTMLTextAreaElement>(null)

  function handleNote(event: React.MouseEvent<HTMLFormElement>){
    
    event.preventDefault();
    
    if(!note.title){
      setError(pre => ({...pre, titleError: true}))
    }
    
    if(!note.note){
      setError(pre => ({...pre, noteError: true}))
    }

  }

  

  return (
    <form className="mx-auto flex items-center flex-col space-y-5 mb-5" onSubmit={handleNote}>
        <input type="text"  
        className= {`w-full bg-secondary text-lg py-1 px-2 rounded-md ${error.titleError ? 'error' : 'outline-yellow-200 border-0'}`}
        value={note.title}
        ref={titleInputRef}
        placeholder= {`${error.titleError ? error.title : "Add Note Title"}`}
        onChange={(e)=>{setNote(pre => {
          if(error.titleError) setError(pre => ({...pre, titleError: false}))
          return {...pre, title: e.target.value}
        })}}
        />
        <textarea name="note" cols="30" rows="10" className= {`w-full bg-secondary text-lg py-1 px-2 rounded-md ${error.noteError ? 'error' : 'outline-yellow-200 border-0'}`}
        placeholder= {`${error.titleError ? error.note : "Add Note Description"}`}
        value={note.note}
        ref={noteInputRef}
        onChange={(e)=>{setNote(pre => {
          if(error.noteError) setError(pre => ({...pre, noteError: false}))
          return {...pre, note: e.target.value}
        })}}
        ></textarea>
        <button type="submit" 
        className="text-2xl bg-yellow-300 py-2 px-3 rounded-md text-primary font-bold flex items-center hover:bg-yellow-400 focus:bg-yellow-400"
        ><GiNotebook className="mr-2 text-3xl"/>Save Note</button>
    </form>
  )
}

export default AddNote