import { Link, NavLink } from 'react-router-dom'
import './Header.scss'
// import { useRoles } from '../../hooks/useRoles';

export default function Header({ role }) {
    // const currentUserRole = useRoles();
    const currentUserRole = role;

    const tabs = {
        tutor: [
            { label: 'Уведомления', to: '/main/notifications' },
            { label: 'Тикеты', to: '/main/tickets' },
            { label: 'Профиль', to: '/main/profile' },
        ],
        student: [
            { label: 'Уведомления', to: '/main/notifications' },
            { label: 'Дедлайны', to: '/main/deadlines' },
            { label: 'Профиль', to: '/main/profile' },
        ]
    };

    const currentTabs = currentUserRole ? tabs[currentUserRole.toLowerCase()] : [];

    return (
        <>

            <header className="header">
                <NavLink to={currentTabs[0].to}><img className='main-logo' src='../../../public/logoMainPage.png' /></NavLink>
                <nav>
                    <ul>
                        <li><NavLink to={currentTabs[0].to} className={({ isActive }) => isActive ? 'link active' : 'link'} > {currentTabs[0].label}</NavLink></li>
                        <li><NavLink to={currentTabs[1].to} className={({ isActive }) => isActive ? 'link active' : 'link'} >{currentTabs[1].label}</NavLink></li>
                    </ul>

                    <button className='btn-profile'><NavLink className={({ isActive }) => isActive ? 'link-profile active' : 'link-profile'} to={currentTabs[2].to}></NavLink></button>

                </nav>
            </header >
        </>
    )
}
