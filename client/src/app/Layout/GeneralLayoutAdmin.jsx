import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import DefaultPage from '../../pages/DefaultPage/DefaultPage';
import TutorAdmin from '../../pages/TutorAdmin/TutorAdmin';
import AddStudentAdmin from '../../pages/AddStudentAdmin/AddStudentAdmin';

export default function GeneralLayoutAdmin() {
    const admin = jwtDecode(localStorage.getItem('token'));
    return (
        <Routes>
            {admin.role === 'ADMIN' && <>
                <Route path='/' element={<AdminLayout />}>
                    <Route index element={<DefaultPage />} />
                    <Route path='add_tutor' element={<TutorAdmin />} />
                    <Route path='add_student' element={<AddStudentAdmin />} />
                </Route>
            </>}
        </Routes>
    )
}
