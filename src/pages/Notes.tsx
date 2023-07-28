import {  useMemo, useState } from "react"
import { Link } from "react-router-dom"
import ReactSelect from "react-select/creatable"
import { Tag } from "../App"

type NoteListProp = {
    availableTags: Tag[]
    notes: NoteCard[]
}

type NoteCard = {
    tags: Tag[]
    title: string
    id: string
}

function Notes({ availableTags, notes }: NoteListProp){

    const [tags, setTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === ""  || note.title.toLowerCase().includes(title.toLowerCase()))
                &&
                (tags.length === 0 || tags.every(tag => {
                    note.tags.some( note => note.id == tag.id)
                })
            ))
        })
    }, [title, tags, notes])

    return(
        <main className="w-3/5 mx-auto">
            <div className="flex justify-between items-center p-2">
                <h1>Notee</h1>
                <div>
                    <Link to="/new">Create New</Link>
                    <Link to="/new" className="ml-5">Edit Tags</Link>
                </div>
            </div>
            <form action="submit">
                <div className="grid grid-cols-4 w-full gap-5 my-5" id="new" >
                    <input  value={title} onChange={(e) => {setTitle(e.target.value)}} className="w-full col-span-2" type="text" placeholder="Title" name="title" itemID="title"/>
                    <ReactSelect 
                    value={tags.map(tag => {
                        return {label: tag.label, value: tag.id}
                    })}
                    onChange={tags => {
                        setTags(tags.map(tag => {
                            return {label: tag.label, id: tag.value}
                        }))
                    }}
                    options={availableTags.map(tag => {return {label: tag.label, value:tag.id}})}
                    isMulti className="w-full col-span-2"/>
                </div>
            </form>
            <div className="grid grid-cols-3 gap-5">
                { filteredNotes.map(note => 
                    <NoteCard key={note.id} id={note.id} title={note.title} tags={note.tags}/>
                )}
            </div>
        </main>
    )
}

export default Notes

function NoteCard({id, title, tags}: NoteCard){
    return(
       <Link to={`/${id}`}>
        <div className="col-span-1 rounded-md shadow-md p-2">
            <h2 className="text-xl">{title}</h2>
           {tags.map(tag =>  <span className="bg-blue-400 rounded-md px-2 py-1">{tag.label}</span>)}
        </div>
       </Link>
    )
}
