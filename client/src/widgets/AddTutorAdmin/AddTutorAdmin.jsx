import axios from "axios";
import { useState } from "react";
import { jwtDecode } from 'jwt-decode';

export default function AddTutorAdmin({ addTutor }) {
    const [tutorInfo, setTutorInfo] = useState({
        firstname: '',
        lastname: '',
        patronymic: '',
        email: '',
        password: ''
    })
    const [isShow, setIsShow] = useState(false);

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await axios.post('http://localhost:5000/api/tutor/registration', {
            firstname: tutorInfo.firstname,
            lastname: tutorInfo.lastname,
            patronymic: tutorInfo.patronymic,
            email: tutorInfo.email,
            password: tutorInfo.password,
            role: 'TUTOR'
        })
            .then(response => {
                if (response.status === 200) {
                    if (!response.data.token) {
                        alert(response.data.message);
                    } else {
                        setTutorInfo({
                            firstname: '',
                            lastname: '',
                            patronymic: '',
                            email: '',
                            password: ''
                        })
                        const newTutor = jwtDecode(response.data.token);
                        addTutor(newTutor);
                        alert('Тьютор успешно создан!')
                    }
                }
            }).catch(e => {
                console.log(e.response);
            })
    }

    return (
        <div className='tutor-admin-info-container'>
            <h2>Информация</h2>
            <form className='tutor-info' onSubmit={handleSubmit}>
                <label htmlFor='firstname'>Имя</label>
                <input type='text' id='firstname' name='firstname' value={tutorInfo.firstname} onChange={(evt) => setTutorInfo(props => ({ ...props, firstname: evt.target.value }))} required />

                <label htmlFor='lastname'>Фамилия</label>
                <input type='text' id='lastname' name='lastname' value={tutorInfo.lastname} onChange={(evt) => setTutorInfo(props => ({ ...props, lastname: evt.target.value }))} required />

                <label htmlFor='patronymic'>Отчество</label>
                <input type='text' id='patronymic' name='patronymic' value={tutorInfo.patronymic} onChange={(evt) => setTutorInfo(props => ({ ...props, patronymic: evt.target.value }))} required />

                <label htmlFor='email'>Почта</label>
                <input type='text' id='email' name='email' value={tutorInfo.email} autoComplete="off" onChange={(evt) => setTutorInfo(props => ({ ...props, email: evt.target.value }))} required />

                <div className="input-wrapper">

                    <label htmlFor='password'>Пароль</label>
                    <input type={isShow ? "text" : "password"} id='password' name='password' value={tutorInfo.password} autoComplete='off' onChange={(evt) => setTutorInfo(props => ({ ...props, password: evt.target.value }))} required />
                    <button type="button" className="btn-show" onClick={() => setIsShow(!isShow)}><img className='show-image' src="../../../public/showPassword.png" /></button>
                </div>

                <button type="submit" className="btn-save">Сохранить</button>
            </form>
        </div>
    )
}
