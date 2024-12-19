import Header from "../../widgets/Header/Header"
import { Outlet } from "react-router-dom"

export default function TutorLayout() {
    return (
        <div className="tutor-layout">
            <Header role='tutor' />
            <Outlet />
        </div>
    )
}
