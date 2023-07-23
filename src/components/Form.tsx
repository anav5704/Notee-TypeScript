import CreatebleReactSelect from "react-select/creatable"
import { Link, useNavigate } from "react-router-dom"
import { FormEvent, useRef, useState } from "react"
import { NoteData, Tag } from "../App"
import {v4 as uuidV4} from "uuid"

type NoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

function Form({ onSubmit, onAddTag, availableTags }: NoteProps ) {

    const titleRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const [tags, setTags] = useState<Tag[]>([])
    const navigate = useNavigate()

    function handlesubmit(e: FormEvent){
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value, 
            content: contentRef.current!.value,
            tags: tags,
        })
        navigate("..")
    }

    return (
        <form action="submit" onSubmit={handlesubmit}>
            <div className="grid grid-cols-4 w-full gap-5 my-5" id="new" >
                <input  ref={titleRef} className="w-full col-span-2" type="text" placeholder="Title" name="title" itemID="title"/>
                <CreatebleReactSelect 
                value={tags.map(tag => {
                    return {label: tag.label, value: tag.id}
                })}
                onChange={tags => {
                    setTags(tags.map(tag => {
                        return {label: tag.label, id: tag.value}
                    }))
                }}
                onCreateOption={label => {
                    const newTag = {id: uuidV4(), label}
                    onAddTag(newTag)
                    setTags(prev => [...prev, newTag])
                }}
                options={availableTags.map(tag => {return {label: tag.label, value:tag.id}})}
                isMulti className="w-full col-span-2"/>
                <textarea ref={contentRef} className="w-full col-span-4" name="md" id="md" rows={10}></textarea>
            </div>
            <div className="flex justify-end gap-5">
                <Link to="..">
                    <button className="py-2 px-4 rounded border-2 border-blue-400">Cancel</button>
                </Link>
                <button type="submit" className="py-2 px-4 bg-blue-400 rounded">Create</button>
            </div>
        </form>
    )
}

export default Form