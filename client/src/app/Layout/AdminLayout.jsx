import Header from "../../widgets/Header/Header"
import { Outlet } from "react-router-dom"

export default function StudentLayout() {
    return (
        <div className="admin-layout">
            <Header role='admin' />
            <Outlet />
        </div>
    )
}