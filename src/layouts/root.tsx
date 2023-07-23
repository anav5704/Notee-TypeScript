import { Outlet } from "react-router-dom"


function Root() {
    return (
        <main>
            <nav className="w-full p-2 text-center shadow">Nav</nav>
            <Outlet />
        </main>
    )
}

export default Root