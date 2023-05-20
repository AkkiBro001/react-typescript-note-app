import { createContext, useContext, useEffect, useReducer } from 'react'
import { ContextProps, MainContextProps, ReducerActionProps, Action, SingleNote, colorChange, SearchQuery, notePayload, noteEdit } from '../constant/TypeGuides'


const initialState: MainContextProps = {
    noteList: [],
    toggleAddNote: false,
    searchQuery: "",
    filterList: [],
    noteHistory: []
}

type CreateContextProps = {
    state: MainContextProps,
    dispatch: ({ type, payload }: ReducerActionProps) => void
}

const MainContextProvider = createContext({ initialState } as unknown as CreateContextProps)




// eslint-disable-next-line react-refresh/only-export-components
export const useMainContext = () => {
    return useContext(MainContextProvider)
}




function MainContext({ children }: ContextProps) {

    function reducer(state: MainContextProps, action: ReducerActionProps): MainContextProps {

        switch (action.type) {
            case Action.loadStorage: return localStorage.getItem("NoteApp") ? JSON.parse(localStorage.getItem("NoteApp") as string) : state;

            case Action.toggleAddNote: return { ...state, toggleAddNote: !state.toggleAddNote };

            case Action.saveNote:
                // eslint-disable-next-line no-case-declarations
                const { id, title, note, noteColor } = action.payload as SingleNote
                //!Local Storage Update
                localStorage.setItem("NoteApp", JSON.stringify({
                    ...state, noteList: [...state.noteList, { id, title, note, noteColor }],
                    noteHistory: [...state.noteHistory, { id, history: `A note with the title "${title}" was made.`, timeStamp: new Date(id).toLocaleString(), noteColor: noteColor }]
                }))
                return {
                    ...state, noteList: [...state.noteList, { id, title, note, noteColor }],
                    noteHistory: [...state.noteHistory, { id, history: `A note with the title "${title}" was made.`, timeStamp: new Date(id).toLocaleString(), noteColor: noteColor }]
                }

            case Action.changeColor:
                // eslint-disable-next-line no-case-declarations
                const updatedNoteList = state.noteList.map(note => {
                    const { id, color } = action.payload as colorChange
                    if (note.id === id) {
                        return { ...note, noteColor: color }
                    } else {
                        return note
                    }
                })
                // eslint-disable-next-line no-case-declarations
                const updatedNoteHistoryList = state.noteHistory.map(history => {
                    const { id, color } = action.payload as colorChange
                    if (history.id === id) {
                        return { ...history, noteColor: color }
                    } else {
                        return history
                    }
                })
                //!Local Storage Update
                localStorage.setItem("NoteApp", JSON.stringify({ ...state, noteList: [...updatedNoteList], noteHistory: [...updatedNoteHistoryList] }))

                return { ...state, noteList: [...updatedNoteList], noteHistory: [...updatedNoteHistoryList] }

            case Action.search:
                // eslint-disable-next-line no-case-declarations
                const { query } = action.payload as SearchQuery

                return { ...state, searchQuery: query, filterList: query ? state.noteList.filter(note => note.title.toLowerCase().includes(query.toLowerCase()) || note.note.toLowerCase().includes(query.toLowerCase())) : [] }

            case Action.deletNote:
                {// eslint-disable-next-line no-case-declarations
                    const { id, title, color } = action.payload as notePayload
                    
                    
                    
                    //!Local Storage Update
                    localStorage.setItem("NoteApp", JSON.stringify({ ...state, noteHistory: [...state.noteHistory, { id: id, history: `A note with the title "${title}" was removed.`, noteColor: color, timeStamp: new Date().toLocaleString() }], noteList: state.noteList.filter(note => note.id !== id) }))

                    return { ...state, noteHistory: [...state.noteHistory, { id: id, history: `A note with the title "${title}" was removed.`, noteColor: color, timeStamp: new Date().toLocaleString() }], noteList: state.noteList.filter(note => note.id !== id) }
                }

            case Action.editTitle: {
                const { id, title, color } = action.payload as noteEdit;
                const oldTitle = state.noteList.find(note => note.id === id)?.title
                const undatedNote = state.noteList.map(note => {
                    if(note.id === id){
                        return {...note, title: title}
                    }else{
                        return note
                    }
                })
                //!Local Storage Update
                localStorage.setItem("NoteApp", JSON.stringify({...state, noteList: undatedNote as SingleNote[], noteHistory: [...state.noteHistory, {id: id, history: `Note title changed from "${oldTitle}" to "${title}"`, noteColor: color, timeStamp: new Date().toLocaleString()}]}))
                return {...state, noteList: undatedNote as SingleNote[], noteHistory: [...state.noteHistory, {id: id, history: `Note title changed from"${oldTitle}" to "${title}"`, noteColor: color, timeStamp: new Date().toLocaleString()}]}
                

            }

            case Action.editNote: {
                const { id, note, color } = action.payload as noteEdit;
                const title = state.noteList.find(note => note.id === id)?.title
                const undatedNote = state.noteList.map(n => {
                    if(n.id === id){
                        return {...n, note: note}
                    }else{
                        return n
                    }
                })
                //!Local Storage Update
                localStorage.setItem("NoteApp", JSON.stringify({...state, noteList: undatedNote as SingleNote[], noteHistory: [...state.noteHistory, {id: id, history: `The "${title}" description was modified.`, noteColor: color, timeStamp: new Date().toLocaleString()}]}))

                return {...state, noteList: undatedNote as SingleNote[], noteHistory: [...state.noteHistory, {id: id, history: `The "${title}" description was modified.`, noteColor: color, timeStamp: new Date().toLocaleString()}]}
                

            }

            // eslint-disable-next-line no-fallthrough
            default: state
        }

        throw console.error("");

    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({ type: Action.loadStorage })
    }, [])


    return (
        <MainContextProvider.Provider value={{ state, dispatch }}>
            {children}
        </MainContextProvider.Provider>
    )
}

export default MainContext