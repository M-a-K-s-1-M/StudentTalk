import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DefaultPage from '../../pages/DefaultPage/DefaultPage';

import NotificationsSectionStudent from '../../pages/NotificationsSection/NotificationsSectionStudent/NotificationsSectionStudent';
import DeadlineSection from '../../pages/DeadlineSection/DeadlineSection';
import ProfileStudent from './../../pages/Profile/ProfileStudent/ProfileStudent';

import NotificationsSectionTutor from '../../pages/NotificationsSection/NotificationsSectionTutor/NotificationsSectionTutor';
import TicketsSectionTutor from '../../pages/TicketsSectionTutor/TicketsSectionTutor';
import ProfileTutor from '../../pages/Profile/ProfileTutor/ProfileTutor';

import StudentLayout from './StudentLayout';
import TutorLayout from './TutorLayout';

import { jwtDecode } from 'jwt-decode';




export default function GeneralLayout() {
    const user = jwtDecode(localStorage.getItem('token'));
    return (
        <Routes>
            {user.role === 'STUDENT' && <>
                <Route path='/' element={<StudentLayout />}>
                    {/* Студентские маршруты */}
                    <Route index element={<DefaultPage />} />
                    <Route path="notifications" element={<NotificationsSectionStudent />} />
                    <Route path="deadlines" element={<DeadlineSection />} />
                    <Route path="profile" element={<ProfileStudent />} />
                </Route>
            </>}

            {user.role === 'TUTOR' && <>
                <Route path='/' element={<TutorLayout />}>
                    {/* Тьюторские маршруты */}
                    < Route index element={< DefaultPage />} />
                    < Route path="notifications" element={< NotificationsSectionTutor />} />
                    < Route path="tickets" element={< TicketsSectionTutor />} />
                    < Route path="profile" element={< ProfileTutor />} />
                </Route>
            </>}
            <Route path='*' element={<Navigate to='/main' replace />} />

        </Routes>
    )
}
