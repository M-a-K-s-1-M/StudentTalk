import { useState } from "react";
import Input from "../../shared/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import './SignUpSection.scss'
import axios from "axios";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')

    const [inputInfo, setInputInfo] = useState({
        email: '',
        password: '',
        passwordRepeat: '',
        group: '',
        role: 'ROLE_USER'
    });

    async function handleSubmit(evt) {
        evt.preventDefault();


        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/v1/auth/register',
            data: {
                email: inputInfo.email,
                password: inputInfo.password,
                role: inputInfo.role,
                groupName: inputInfo.group,
            }
        }

        await axios(config)
            .then(response => {
                if (response.status === 200) {
                    navigate('/signin')
                }
            })
            .catch(error => {
                console.error('Ошибка при регистрации:', error);
                setErrorMessage('Произошла ошибка при регистрации. Попробуйте еще раз.');
            })

        // try {
        //     const response = await axios.post('http://localhost:8080/api/v1/auth/register',
        //         {
        //             username: usernameCorrect,
        //             email: inputInfo.email,
        //             password: inputInfo.password,
        //             role: inputInfo.role,
        //             groupName: inputInfo.group,
        //         });


        //     if (response.status === 200) {
        //         navigate('/signin');
        //     } else {
        //         throw new Error('Не удалось зарегистрироваться')
        //     }
        // } catch (error) {
        //     console.error('Ошибка при регистрации:', error);
        //     setErrorMessage('Произошла ошибка при регистрации. Попробуйте еще раз.');

        // }
    }

    return (
        <section className="sign-up">
            <img src='../../../public/imageAuthorization.png' alt='' />
            <form className="auth-form" onSubmit={handleSubmit}>

                <p>Email</p>
                <Input
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

                <p>Пароль</p>
                <Input
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
                <Input
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

                <p>Роль</p>
                <label>
                    <select value={inputInfo.role} onChange={(evt) => {
                        setInputInfo(props => {
                            return {
                                ...props,
                                role: evt.target.value
                            }
                        })
                    }}>
                        <option aria-checked value='ROLE_USER'>Студент</option>
                        <option value='ROLE_TUTOR_UNRECOGNIZED'>Тьютор</option>
                    </select>
                </label>

                {inputInfo.role === 'ROLE_USER' &&
                    <>
                        <p>Академическая группа</p>
                        <Input
                            type='text'
                            id='group'
                            name='group'
                            autoComplete='off'
                            value={inputInfo.group}
                            onChange={(evt) => {
                                setInputInfo(props => {
                                    return {
                                        ...props,
                                        group: evt.target.value
                                    }
                                })
                            }}
                        />
                    </>
                }

                <button className="btn-auth" onClick={evt => { evt.preventDefault() }}>Регистрация</button>
            </form>

            {errorMessage && <p>{errorMessage}</p>}


            <p>У меня уже есть аккаунт <Link className='link' to='/'>Войти</Link></p>
        </section>
    )
}

