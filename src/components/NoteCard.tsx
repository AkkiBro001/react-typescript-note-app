import React, { useEffect, useRef, useState } from "react"
import { SlOptions } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BsCheck } from "react-icons/bs"
import { NoteColor, NoteEditType } from "../constant/TypeGuides";

function NoteCard() {

    const [show, setShow] = useState<boolean>(false)
    const [noteColor, setNoteColor] = useState<string>("yellow")
    const [isEdit, setIsEdit] = useState<NoteEditType>({titleEdit: false, noteEdit: false})

    //Input Ref
    const inputTitleEditRef = useRef<HTMLInputElement>(null)
    const inputNoteEditRef = useRef<HTMLTextAreaElement>(null)

    function handleNoteColor(colorName: NoteColor) {
        setNoteColor(colorName)
    }

    function handleEditTitle() {
        setIsEdit({titleEdit: true, noteEdit: false})
    }

    function handleEditNote() {
        setIsEdit({titleEdit: false, noteEdit: true})
    }

    function submitEdit(event: React.MouseEvent<HTMLFormElement>){
            event.preventDefault()
    }

    useEffect(()=>{
        if(isEdit.titleEdit){
            inputTitleEditRef.current?.focus()
        }else{
            inputNoteEditRef.current?.focus()
        }
    },[isEdit])


    return (
        <div className="md:w-[300px] xs:w-full overflow-hidden shrink-0 m-2">
            <header className={`flex p-2 text-primary relative bg-${noteColor}-400`}
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
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, a.</div>

                            : <form className="flex-1"
                            onSubmit={(e:React.MouseEvent<HTMLFormElement>)=>submitEdit(e)}
                            >
                                <input className="text-xl border-0 outline-none bg-transparent w-full" defaultValue="Title" ref={inputTitleEditRef}/>
                            </form>
                    }
                    <button className="cursor-pointer" tabIndex={0}
                        onClick={() => setShow(pre => !pre)}
                    ><SlOptions /></button>
                </div>


                {show && <div className="option absolute top-[42px] left-0">
                    <div className="bg-secondary">
                        <div className="flex">
                            <button className="w-[50px] h-[50px] bg-yellow-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("yellow") }}>{noteColor === "yellow" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-red-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("red") }}>{noteColor === "red" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-green-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("green") }}>{noteColor === "green" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-blue-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("blue") }}>{noteColor === "blue" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-cyan-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("cyan") }}>{noteColor === "cyan" ? <BsCheck /> : null}</button>
                            <button className="w-[50px] h-[50px] bg-purple-200 grid place-content-center text-xl cursor-pointer" tabIndex={0} onClick={() => { handleNoteColor("purple") }}>{noteColor === "purple" ? <BsCheck /> : null}</button>
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
                            <button className="p-2 text-light w-full text-left flex space-x-2 items-center hover:text-primary hover:bg-light focus:text-primary focus:bg-light">
                                <RiDeleteBin6Line />
                                <span>Delete Note</span>
                            </button>
                        </div>
                    </div>
                </div>}
            </header>

            <form className={`bg-${noteColor}-200 text-primary p-2 ${show ? 'overlay' : ''}`}
                onMouseDown={() => {
                    if (show) setShow(false);
                }}
                onSubmit={(e:React.MouseEvent<HTMLFormElement>)=>submitEdit(e)}
            >
                <textarea cols="30" rows="10" className={`w-full border-0 outline-none bg-transparent scrollBar ${show ? 'select-none overflow-hidden' : ''}`}
                    defaultValue={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet mollitia dicta nisi facilis tempore explicabo doloremque eos nulla ex adipisci asperiores quam nam, sed sequi, quis accusamus voluptates officiis quibusdam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet mollitia dicta nisi facilis tempore explicabo doloremque eos nulla ex adipisci asperiores quam nam, sed sequi, quis accusamus voluptates officiis quibusdam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet mollitia dicta nisi facilis tempore explicabo doloremque eos nulla ex adipisci asperiores quam nam, sed sequi, quis accusamus voluptates officiis quibusdam!"}
                    ref = {inputNoteEditRef}
                    readOnly = {isEdit.noteEdit ? false : true}
                >

                </textarea>
            </form>
        </div>
    )
}

export default NoteCard