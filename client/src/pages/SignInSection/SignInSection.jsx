import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import './SignInSection.scss'
import axios from 'axios';
import { useUserStore } from '../../app/Stores/useUserStore';
import { jwtDecode } from 'jwt-decode';


export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setStudent, setTutor } = useUserStore()

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await axios.post('http://localhost:5000/api/user/login',
            {
                email,
                password
            })
            .then(response => {
                if (response.status === 200) {
                    localStorage.removeItem('token')
                    localStorage.setItem('token', response.data.token);
                    const user = jwtDecode(response.data.token);
                    if (user.role === 'STUDENT') {
                        setStudent(user);
                    } else if (user.role === 'TUTOR') {
                        setTutor(user)
                    }
                    navigate('/main/notifications')
                } else {
                    console.log(response);
                }
            }).catch(e => {
                console.log(e);
            })
    }

    return (
        <section className='sign-in'>
            <img src="../../../public/imageAuthorization.png"></img>
            <form className="auth-form" onSubmit={handleSubmit}>
                <p>Email</p>
                <label title="Email" htmlFor="email" >
                    <input
                        type='email'
                        id='email'
                        name='email'
                        autoComplete='off'
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                        required
                    />
                </label><br />

                <p>Пароль</p>
                <label title="Пороль" htmlFor="password">
                    <input
                        type='password'
                        id='password'
                        name='password'
                        autoComplete="off"
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                        required

                    />
                </label><br />

                <button className='btn-auth' >Вход</button>
            </form>

            <p>У меня нет аккаунта <Link className='link' to='/signup'>Зарегистрироваться</Link></p>

        </section>
    )
}