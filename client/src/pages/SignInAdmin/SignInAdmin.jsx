import { useState } from 'react';
import './SignInAdmin.scss';
import { login } from '../../shared/api/adminAPI';
import { useNavigate } from 'react-router-dom';


export default function SignInAdmin() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const response = await login(password);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            navigate('/main_admin/add_tutor');
        } else {
            alert(response.data.message);
        }

    }

    return (
        <section className="signin-admin-container">
            <div className="signin-admin">
                <img className="logo-admin" src="../../../public/logoAuthorizationAdmin.png" alt="Логотип" />
                <div className="form-info">
                    <h2>Панель админстарора</h2>
                    <form className='admin-form' onSubmit={handleSubmit}>
                        <label htmlFor='password'>Пароль</label>
                        <input type="password" name='password' id="password" autoCapitalize='off' value={password} onChange={(evt) => setPassword(evt.target.value)} required />
                        <div className="btn-wrapper">
                            <button className="btn-submit">Вход</button>
                        </div>
                    </form>
                </div>
            </div>
        </section >
    )
}
