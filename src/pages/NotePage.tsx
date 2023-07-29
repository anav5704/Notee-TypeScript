import { Link } from "react-router-dom"
import { useNote } from "../layouts/NoteLayout"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

function NotePage(){
    const note = useNote()
    return(
        <main className="w-3/5 mx-auto">
        <div className="flex justify-between items-center p-2">
            <h1>Notee</h1>
            <div>
                <Link to={`/${note.id}/edit`} className="ml-5">Edit</Link>
                <Link to="/new" className="ml-5">Save</Link>
            </div>
        </div>
        <h1 className="text-xl">{ note.title }</h1>
        { note.tags.map(tag => <span className="bg-blue-400 rounded-md px-2 py-1">{ tag.label }</span>)}
        <ReactMarkdown>{ note.content }</ReactMarkdown>
    </main>
    )
}

export default NotePage