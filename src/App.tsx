import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider} from "react-router-dom"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid"
import Root from "./layouts/root"
import Home from "./pages/Home"
import New from "./pages/New"
import Notes from "./pages/Notes";

export type Note = {
    id: string
}   & NoteData

export type NoteData = {
    title: string ,
    content: string ,
    tags : Tag[]
}

export type RawNote = {
    id: string
}   & RawNoteData

export type RawNoteData = {
    title: string ,
    content: string ,
    tagids : string[]
}

export type Tag = {
    id: string , 
    label: string
}

function App() {

    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

    const taggedNotes = useMemo(() => {
        return notes.map(note => {
            return { ...note, tags: tags.filter(tag => note.tagids.includes(tag.id))}
        })
    }, [notes, tags])
    
    console.log(taggedNotes)

    function onCreateNote( {tags, ...data}: NoteData ){ 
        setNotes(prevNotes => {
            return [...prevNotes, {...data, id: uuidV4(), tagids: tags.map(tag => tag.id)}]
        })
    }

    function addTag (tag: Tag){
        setTags(prev => [...prev, tag])
    }

    const router = createBrowserRouter (
        createRoutesFromElements (
        <Route path="/" element={ <Root /> }>
            <Route index element={ <Home /> } />
            <Route path="all" element={ <Notes /> } />
            <Route path="new" element={ <New onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>  }/>
            <Route path="*" element={ <h1>Error 404</h1> } />
            <Route path="/:id">
                <Route index element={ <h1>Note</h1> } />
                <Route path="edit" element={ <h1>Edit Note</h1> } />
            </Route>
        </Route>
        )
    )

  return (
   <RouterProvider router={router} />
  )
}

export default App
