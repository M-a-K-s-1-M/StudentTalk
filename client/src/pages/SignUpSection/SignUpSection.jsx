import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignUpSection.scss'
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../../app/Stores/useUserStore";

export default function SignUpForm() {
    const navigate = useNavigate();
    const { setStudent, setTutor } = useUserStore();

    const [inputInfo, setInputInfo] = useState({
        firstname: '',
        lastname: '',
        patronymic: '',
        email: '',
        password: '',
        passwordRepeat: '',
        academGroup: '',
        role: 'STUDENT'
    });

    async function handleSubmit(evt) {
        evt.preventDefault();

        if (inputInfo.password !== inputInfo.passwordRepeat) {
            return alert('Пароли не совпадают');
        }

        if (inputInfo.role === 'STUDENT') {
            const curs = inputInfo.academGroup[3];

            await axios.post('http://localhost:5000/api/student/registration',
                {
                    firstname: inputInfo.firstname,
                    lastname: inputInfo.lastname,
                    patronymic: inputInfo.patronymic,
                    email: inputInfo.email,
                    password: inputInfo.password,
                    role: inputInfo.role,
                    academGroup: inputInfo.academGroup,
                    numberCurs: curs
                })
                .then(response => {
                    localStorage.removeItem('token')
                    localStorage.setItem('token', response.data.token);
                    const student = jwtDecode(response.data.token)
                    setStudent(student);
                    navigate('/')
                }).catch(e => {
                    console.log(e);
                })
        }
    }

    return (
        <section className="sign-up">
            <img src='../../../public/imageAuthorization.png' alt='' />
            <form className="auth-form" onSubmit={handleSubmit}>

                <p>Имя</p>
                <input
                    type='text'
                    id='firstname'
                    name='firstname'
                    autoComplete='off'
                    value={inputInfo.firstname}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                firstname: evt.target.value
                            }
                        })
                    }}
                />

                <p>Фамилия</p>
                <input
                    type='text'
                    id='lastname'
                    name='lastname'
                    autoComplete='off'
                    value={inputInfo.lastname}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                lastname: evt.target.value
                            }
                        })
                    }}
                />

                <p>Отчество</p>
                <input
                    type='text'
                    id='patronymic'
                    name='patronymic'
                    autoComplete='off'
                    value={inputInfo.patronymic}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                patronymic: evt.target.value
                            }
                        })
                    }}
                />

                <p>Email</p>
                <input
                    type='text'
                    id='email'
                    name='email'
                    autoComplete='off'
                    value={inputInfo.email}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                email: evt.target.value
                            }
                        })
                    }}
                />

                <p>Академическая группа</p>
                <input
                    type='text'
                    id='academGroup'
                    name='academGroup'
                    autoComplete='off'
                    value={inputInfo.academGroup}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                academGroup: evt.target.value
                            }
                        })
                    }}
                />

                <p>Пароль</p>
                <input
                    type='password'
                    id='password'
                    name='password'
                    autoComplete='off'
                    value={inputInfo.password}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                password: evt.target.value
                            }
                        })
                    }}
                />

                <p>Потверждение пароля</p>
                <input
                    type='password'
                    id='passwordRepeat'
                    name='passwordRepeat'
                    autoComplete='off'
                    value={inputInfo.passwordRepeat}
                    onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                passwordRepeat: evt.target.value
                            }
                        })
                    }}
                />
                <button className="btn-auth">Регистрация</button>
            </form>

            <p>У меня уже есть аккаунт <Link className='link' to='/'>Войти</Link></p>
        </section>
    )
}

