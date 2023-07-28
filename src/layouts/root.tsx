import { Outlet } from "react-router-dom"


function Root() {
    return (
        <main className="h-screen">
            <Outlet />
        </main>
    )
}

export default Root