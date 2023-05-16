import {createContext, useContext, useEffect, useReducer} from 'react'
import { ContextProps, MainContextProps, ReducerActionProps, Action, SingleNote, colorChange } from '../constant/TypeGuides'


const initialState: MainContextProps = {
    noteList: [],
    toggleAddNote: false,
    searchQuery: "",
    filterList: [],
    noteHistory: []
}

type CreateContextProps = {
    state: MainContextProps,
    dispatch: ({type, payload}: ReducerActionProps) => void
}

const MainContextProvider = createContext({ initialState } as unknown as CreateContextProps)




// eslint-disable-next-line react-refresh/only-export-components
export const useMainContext = () => {
    return useContext(MainContextProvider)
}



 
function MainContext({children}: ContextProps){

    function reducer(state: MainContextProps, action: ReducerActionProps): MainContextProps{
        
        switch(action.type){
            case Action.loadStorage: return localStorage.getItem("NoteApp") ? JSON.parse(localStorage.getItem("NoteApp") as string) : state;
            case Action.toggleAddNote : return {...state, toggleAddNote: !state.toggleAddNote};
            case Action.saveNote : 
                // eslint-disable-next-line no-case-declarations
                const {id, title, note, noteColor} = action.payload as SingleNote
                //!Local Storage Update
                localStorage.setItem("NoteApp", JSON.stringify({...state, noteList: [...state.noteList, {id, title, note, noteColor}], 
                    noteHistory: [...state.noteHistory, {id, history: `"${title}" note was created`, timeStamp: new Date(id).toLocaleString(), noteColor: noteColor}]
                }))
                return {...state, noteList: [...state.noteList, {id, title, note, noteColor}], 
                noteHistory: [...state.noteHistory, {id, history: `"${title}" note was created`, timeStamp: new Date(id).toLocaleString(), noteColor: noteColor}]
                }
                
            case Action.changeColor : 
                // eslint-disable-next-line no-case-declarations
                const updatedNoteList = state.noteList.map(note => {
                    const {id, color} = action.payload as colorChange
                    if(note.id === id){
                        return {...note, noteColor: color}
                    }else{
                        return note
                    }
                }) 
                // eslint-disable-next-line no-case-declarations
                const updatedNoteHistoryList = state.noteHistory.map(history => {
                    const {id, color} = action.payload as colorChange
                    if(history.id === id){
                        return {...history, noteColor: color}
                    }else{
                        return history
                    }
                }) 
                //!Local Storage Update
                localStorage.setItem("NoteApp", JSON.stringify({...state, noteList: [...updatedNoteList], noteHistory: [...updatedNoteHistoryList]}))

                return {...state, noteList: [...updatedNoteList], noteHistory: [...updatedNoteHistoryList]}

            
            // eslint-disable-next-line no-fallthrough
            default : state
        }

        throw console.error("");
        
    }

   const [state, dispatch] = useReducer(reducer, initialState)

   useEffect(()=>{
        dispatch({type: Action.loadStorage})
   },[])

  return (
    <MainContextProvider.Provider value={{state, dispatch}}>
            {children}
    </MainContextProvider.Provider>
  )
}

export default MainContext