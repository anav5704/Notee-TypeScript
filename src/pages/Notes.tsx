import { Link } from "react-router-dom"

function Notes(){
    return(
        <main className="w-3/5 mx-auto">
            <div className="flex justify-between items-center p-2">
                <h1>Notee</h1>
                <div>
                    <Link to="/new">Create New</Link>
                    <Link to="/new" className="ml-5">Edit Tags</Link>
                </div>
            </div>
        </main>
    )
}

export default Notes