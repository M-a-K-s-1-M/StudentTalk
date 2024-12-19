import { useNavigate } from 'react-router-dom';
import './LogoutModal.scss';


export default function LogoutModal({ onClose }) {
    const navigate = useNavigate();
    return (
        <section className="logout-container">
            <h3 className='title-logout'>Выйти из аккаунта?</h3>
            <p className='description-logout'>*при подтверждении вы выйдите из данного профиля и вернётесь на страницу авторизации.</p>

            <div className='btn-logout-wrapper'>
                <button className='btn-yes' onClick={() => navigate('/')}>Да</button>
                <button className='btn-no' onClick={onClose}>Нет</button>
            </div>
        </section>
    )
}
