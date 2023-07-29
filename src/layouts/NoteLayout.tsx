import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "../App"

type NoteLayoutProps = {
    notes: Note[]
}

function NoteLayout({ notes }: NoteLayoutProps){

    const { id } = useParams()
    const note = notes.find(n => n.id === id)

    return(
        note ?
        <Outlet context={ note } />
        :
        <Navigate  to="/" replace/>
    )
}

export default NoteLayout

export function useNote(){
    return useOutletContext<Note>()
}
