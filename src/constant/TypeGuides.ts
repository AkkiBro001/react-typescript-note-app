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