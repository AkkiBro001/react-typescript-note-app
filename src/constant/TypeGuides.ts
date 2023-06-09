export interface NoteType {
    title: string, 
    note: string
}

export interface NoteTypeError extends NoteType {
    titleError: boolean, 
    noteError: boolean
}

export type NoteColor = "yellow" | "red" | "green" | "blue" | "cyan" | "purple"

export interface NoteEditType {
    titleEdit: boolean, 
    noteEdit: boolean
}

export interface SingleNote extends NoteType{
    id: number,
    noteColor: string
}

export interface SingleHistory{
    id: number,
    history: string,
    timeStamp: string,
    noteColor: string
}

export interface ContextProps {
    children: React.ReactNode;
  }


export interface MainContextProps {
    noteList: SingleNote[],
    toggleAddNote: boolean,
    searchQuery: string,
    filterList: SingleNote[],
    noteHistory: SingleHistory[]
}

export enum Action {
    loadStorage = "loadStorage",
    updateStorage = "updateStorage",
    search = "search",
    toggleAddNote = "toggleAddNote",
    updateNoteHistory = "updateNoteHistory",
    saveNote = "saveNote",
    editTitle = "editTitle",
    editNote = "editNote",
    deletNote = "deleteNote",
    changeColor = "changeColor",
    clearHistory = "clearHistory"
  }

export interface colorChange {id: number, color: string}

export interface notePayload {id: number, title: string, color: string}

export interface noteEdit {id: number, title?: string, note?: string, color:string}

export interface SearchQuery {query: string}

export interface ReducerActionProps {
    type: string,
    payload?: boolean | SingleNote | colorChange | SearchQuery | notePayload | noteEdit
}
