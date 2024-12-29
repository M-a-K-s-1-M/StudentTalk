import { useState } from 'react';
import './ProfileTutor.scss';
import LogoutModal from '../../../widgets/Modal/LogoutModal/LogoutModal';
import { jwtDecode } from 'jwt-decode';
import { updatePassword } from '../../../shared/api/tutorAPI';

export default function ProfileTutor() {
    const [isLogout, setIsLogout] = useState(false);
    const tutor = jwtDecode(localStorage.getItem('token'));

    const [passwordInfo, setPasswordInfo] = useState({
        password: '',
        newPassword: '',
        newPasswordRepeat: '',
    })

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setPasswordInfo({
            password: '',
            newPassword: '',
            newPasswordRepeat: '',
        })

        await updatePassword(passwordInfo.password, passwordInfo.newPassword, passwordInfo.newPasswordRepeat, tutor.id);
    }

    return (
        <section className="profile-container-t">
            <section className="profile">
                <h3 className='form-title'>Основная информация</h3>
                <form className='user-info-form'>
                    <label htmlFor="role">Роль</label>
                    <input type='text' id='role' name="role" value={tutor.role === 'TUTOR' && "Тьютор"} disabled />

                    <label htmlFor="name">Имя</label>
                    <input type='text' id='name' name="name" value={tutor.firstname} disabled />

                    <label htmlFor="surname">Фамилия</label>
                    <input type='text' id='surname' name="surname" value={tutor.lastname} disabled />

                    <label htmlFor="patronymic">Отчество</label>
                    <input type='text' id='patronymic' name="patronymic" value={tutor.patronymic} disabled />

                    <label htmlFor="email">Почта</label>
                    <input type='text' id='email' name="email" value={tutor.email} disabled />

                </form>

                <h3 className='form-title'>Смена пароля</h3>
                <form className='password-form' onSubmit={handleSubmit}>
                    <label htmlFor="password">Пароль</label>
                    <input type='password' id='password' name="password" autoComplete='off' value={passwordInfo.password} onChange={evt => setPasswordInfo(props => ({ ...props, password: evt.target.value }))} required />

                    <label htmlFor="newPassword">Новый пароль</label>
                    <input type='password' id='newPassword' name="newPassword" autoComplete='off' value={passwordInfo.newPassword} onChange={evt => setPasswordInfo(props => ({ ...props, newPassword: evt.target.value }))} required />

                    <label htmlFor="newPasswordRepeat">Потверждение пароля</label>
                    <input type='password' id='newPasswordRepeat' name="newPasswordRepeat" autoComplete='off' value={passwordInfo.newPasswordRepeat} onChange={evt => setPasswordInfo(props => ({ ...props, newPasswordRepeat: evt.target.value }))} required />

                    {passwordInfo.password && passwordInfo.newPassword && passwordInfo.newPasswordRepeat ? <button className="btn-change" type="submit">Поменять</button> : <button className="btn-change disabled" type="submit">Поменять</button>}
                </form>

                <div className="logout-link-wrapper">
                    <a href="#" onClick={(evt) => { evt.preventDefault(); setIsLogout(true) }}>Выйти из аккаунта</a>
                    {isLogout && <LogoutModal onClose={() => setIsLogout(false)} />}
                </div>
            </section>
        </section>
    )
}