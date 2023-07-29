import { NoteData, Tag } from "../App"
import Form from "../components/Form"   
import { useNote } from "../layouts/NoteLayout"

type EditNoteProps = {
    onSubmit: ( id: string, data : NoteData ) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const note = useNote()

function Edit({ onSubmit, onAddTag, availableTags}: EditNoteProps){
    return( 
        <>
            <div className="p-5">
                <h1>Edit Note</h1>
                <Form title={note.title} content={note.content} tags={note.tags} onSubmit={data => onSubmit(note.id, data)} onAddTag={onAddTag} availableTags={availableTags}/>
            </div>
        </>
    )
}

export default Edit