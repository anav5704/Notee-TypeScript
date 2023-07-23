import { NoteData, Tag } from "../App"
import Form from "../components/Form"   

type NewNoteProps = {
    onSubmit: ( data : NoteData ) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
    }

function New({ onSubmit, onAddTag, availableTags}: NewNoteProps){
    return( 
        <>
            <div className="p-5">
                <h1>Create New Note</h1>
                <Form onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
            </div>
        </>
    )
}

export default New