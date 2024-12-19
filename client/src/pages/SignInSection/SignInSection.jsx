import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import './SignInSection.scss'
import axios from 'axios';
// import AuthService from '../../../services/AuthService';


export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/v1/auth/signin',
            withCredentials: true,
            data: {
                email: email,
                password: password,
            }
        }

        await axios(config)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token)

                    // Добавить перемешение либо на /student, либо на /tutor
                    navigate('/student');
                }
            })
            .catch(async (error) => {
                console.error('Ошибка: ', error);

                const config = {
                    method: 'post',
                    url: 'http://localhost:8080/api/v1/auth/refresh-token',
                    withCredentials: true,
                }

                await axios(config)
                    .then(refreshResponse => {
                        if (refreshResponse.data.token) {
                            localStorage.setItem('token', refreshResponse.data.accessToken);
                            console.log('токен обновлён')
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })

        // try {
        //     const response = await axios.post('http://localhost:8080/api/v1/auth/signin', {
        //         email,
        //         password
        //     },
        //         {
        //             withCredentials: true
        //         });

        //     if (response.status === 200) {
        //         localStorage.setItem('token', response.data.token);

        //         navigate('/main')

        //     }
        // } catch (error) {
        //     console.error('Ошибка: ', error);

        //     // Здесь можно дополнительно обработать ошибки и попробовать обновить токен
        //     const refreshResponse = await axios.post('http://localhost:8080/api/v1/auth/refresh-token', {
        //         withCredentials: true,
        //     });

        //     if (refreshResponse.data.token) {
        //         localStorage.setItem('token', refreshResponse.data.accessToken);
        //     }
        //     console.log('токен обновлён')
        // }
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
                    ></input>
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

                    ></input>
                </label><br />

                <button className='btn-auth' onClick={evt => { evt.preventDefault() }}>Вход</button>
            </form>

            <p>У меня нет аккаунта <Link className='link' to='/signup'>Зарегистрироваться</Link></p>

        </section>
    )
}