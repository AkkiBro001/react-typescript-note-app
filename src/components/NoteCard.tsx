import { useEffect, useRef, useState } from "react"
import { SlOptions } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BsCheck } from "react-icons/bs"
import { Action, NoteColor, NoteEditType, SingleNote, noteEdit } from "../constant/TypeGuides";
import { useMainContext } from "../context/MainContext";

function NoteCard({id, title, note, noteColor}: SingleNote) {

    const [show, setShow] = useState<boolean>(false)
    const [color, setColor] = useState<string>(noteColor)
    const [isEdit, setIsEdit] = useState<NoteEditType>({titleEdit: false, noteEdit: false})

    //Input Ref
    const inputTitleEditRef = useRef<HTMLInputElement>(null)
    const inputNoteEditRef = useRef<HTMLTextAreaElement>(null)

    const {state, dispatch} = useMainContext()

    function handleNoteColor(colorName: NoteColor, id: number) {
        setColor(colorName)
        dispatch({type: Action.changeColor, payload: {id, color: colorName}})
        
    }

    function handleEditTitle() {
        setIsEdit({titleEdit: true, noteEdit: false})
        
    }

    function handleEditNote() {
        setIsEdit({titleEdit: false, noteEdit: true})
    }

    function handleSubmitEdit(id:number, color: string){
            if(isEdit.titleEdit){
                const title = inputTitleEditRef && inputTitleEditRef.current && inputTitleEditRef.current.value
                if(!title) return
                dispatch({type: Action.editTitle, payload: {id, title, color} as noteEdit})
                setIsEdit({titleEdit: false, noteEdit: false})
            }else{
                const note = inputNoteEditRef && inputNoteEditRef.current && inputNoteEditRef.current.value
                dispatch({type: Action.editNote, payload: {id, note, color} as noteEdit})
                setIsEdit({titleEdit: false, noteEdit: false})
            }
    }

    function handleCancleEdit(id:number){
        const note = state.noteList.find(note => note.id === id) as SingleNote;
        
        if(inputTitleEditRef && inputTitleEditRef.current) {
            inputTitleEditRef.current.value = note.title
        }else if(inputNoteEditRef && inputNoteEditRef.current){
            inputNoteEditRef.current.value = note.note
        }
        setIsEdit({titleEdit: false, noteEdit: false})
        
    }

    function handleDeleteNote(id: number, title: string, noteColor: string){
        dispatch({type: Action.deletNote, payload: {id, title, color: noteColor}})
    }

    useEffect(()=>{
        if(isEdit.titleEdit){
            inputTitleEditRef.current?.focus()
            
        }else if(isEdit.noteEdit){
            inputNoteEditRef.current?.focus()
            
        }
    },[isEdit])

    //Fix Header Color Issue
    const setColorsForNoteHeader: string = color==="yellow" ? "#facc15" : color==="red" ? "#f87171" : color==="green" ? "#4ade80" : color==="blue" ? "#60a5fa" : color==="cyan" ? "#22d3ee" : "#c084fc"

    return (
        <div className="md:w-[300px] xs:w-full overflow-hidden shrink-0 m-2">
            <header className={`flex p-2 text-primary relative`}
                style={{backgroundColor: setColorsForNoteHeader}}
                onClick={() => {
                    if (show) setShow(false);
                }}
            >
                <div className="flex items-center justify-between w-full space-x-2">
                    {
                        !isEdit.titleEdit ? <div
                            className="text-xl border-0 outline-none bg-transparent w-full"
                            style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
                            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, a."
                        >{title}</div>

                            : <div className="flex-1"
                            
                            >
                                <input className="text-xl border-0 outline-none bg-transparent w-full" defaultValue={title} ref={inputTitleEditRef}/>
                            </div>
                    }
                    <button className="cursor-pointer" tabIndex={0}
                        onClick={() => setShow(pre => !pre)}
                    ><SlOptions /></button>
                </div>


                {show && <div className="option absolute top-[42px] md:left-0 xs:right-0">
                    <div className="bg-secondary">
                        <div className="flex">
                            <button className="w-[50px] h-[50px] bg-yellow-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("yellow", id) }}>{color === "yellow" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-red-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("red", id) }}>{color === "red" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-green-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("green", id) }}>{color === "green" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-blue-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("blue", id) }}>{color === "blue" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-cyan-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("cyan", id) }}>{color === "cyan" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-purple-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("purple", id) }}>{color === "purple" ? <BsCheck /> : null}</button>
                        </div>
                        <div className="flex flex-col">
                            <button className="p-2 text-light w-full text-left flex space-x-2 items-center hover:text-primary hover:bg-light focus:text-primary focus:bg-light"
                                onClick={() => handleEditTitle()}
                            >
                                <FaRegEdit />
                                <span>Edit Title</span>
                            </button>
                            <button className="p-2 text-light w-full text-left flex space-x-2 items-center hover:text-primary hover:bg-light focus:text-primary focus:bg-light"
                            onClick={() => handleEditNote()}
                            >
                                <FaRegEdit />
                                <span>Edit Note</span>
                            </button>
                            <button className="p-2 text-light w-full text-left flex space-x-2 items-center hover:text-primary hover:bg-light focus:text-primary focus:bg-light"
                            onClick={()=>handleDeleteNote(id, title, noteColor)}
                            >
                                <RiDeleteBin6Line />
                                <span>Delete Note</span>
                            </button>
                        </div>
                    </div>
                </div>}
            </header>

            <form className={`bg-${color}-200 text-primary p-2 ${show ? 'overlay' : ''}`}
                onMouseDown={() => {
                    if (show) setShow(false);
                }}
               
            >
                <textarea cols="30" rows="10" className={`w-full border-0 outline-none bg-transparent scrollBar ${show ? 'select-none overflow-hidden' : ''}`}
                    defaultValue={note}
                    ref = {inputNoteEditRef}
                    readOnly = {isEdit.noteEdit ? false : true}
                >

                </textarea>

                {isEdit.titleEdit || isEdit.noteEdit ? <div className="flex items-center justify-end space-x-3">
                    <button className="bg-red-200 px-2 py-1 rounded-lg hover:opacity-80" style={{backgroundColor: setColorsForNoteHeader}}
                    onClick={()=>handleSubmitEdit(id, noteColor)}
                    >Save</button>
                    <button className="px-2 py-1 rounded-lg bg-secondary text-light hover:bg-gray-600"
                    onClick={()=>handleCancleEdit(id)}
                    >Cancle</button>
                </div> : null}
            </form>
        </div>
    )
}

export default NoteCard