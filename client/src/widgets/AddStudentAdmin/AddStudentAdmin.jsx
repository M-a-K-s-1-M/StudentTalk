import axios from "axios";
import { useState } from "react";
import { jwtDecode } from 'jwt-decode';
import './AddStudentAdmin.scss'

export default function AddStudentAdmin({ addStudent }) {
    const [studentInfo, setStudentInfo] = useState({
        firstname: '',
        lastname: '',
        patronymic: '',
        email: '',
        group: '',
        password: ''
    })
    const [isShow, setIsShow] = useState(false);

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await axios.post('http://localhost:5000/api/student/registration', {
            firstname: studentInfo.firstname,
            lastname: studentInfo.lastname,
            patronymic: studentInfo.patronymic,
            email: studentInfo.email,
            academGroup: studentInfo.group,
            password: studentInfo.password,
            role: 'STUDENT'
        })
            .then(response => {
                if (response.status === 200) {
                    if (!response.data.token) {
                        alert(response.data.message);
                    } else {
                        setStudentInfo({
                            firstname: '',
                            lastname: '',
                            patronymic: '',
                            email: '',
                            group: '',
                            password: ''
                        })
                        const newStudent = jwtDecode(response.data.token);
                        addStudent(newStudent);
                        alert('Студент успешно создан!')
                    }
                }
            }).catch(e => {
                console.log(e.response);
            })
    }

    return (
        <div className='student-admin-info-container'>
            <h2>Информация</h2>
            <form className='student-info' onSubmit={handleSubmit}>
                <label htmlFor='firstname'>Имя</label>
                <input type='text' id='firstname' name='firstname' value={studentInfo.firstname} onChange={(evt) => setStudentInfo(props => ({ ...props, firstname: evt.target.value }))} required />

                <label htmlFor='lastname'>Фамилия</label>
                <input type='text' id='lastname' name='lastname' value={studentInfo.lastname} onChange={(evt) => setStudentInfo(props => ({ ...props, lastname: evt.target.value }))} required />

                <label htmlFor='patronymic'>Отчество</label>
                <input type='text' id='patronymic' name='patronymic' value={studentInfo.patronymic} onChange={(evt) => setStudentInfo(props => ({ ...props, patronymic: evt.target.value }))} required />

                <label htmlFor='email'>Почта</label>
                <input type='text' id='email' name='email' value={studentInfo.email} autoComplete="off" onChange={(evt) => setStudentInfo(props => ({ ...props, email: evt.target.value }))} required />

                <label htmlFor='Группа'>Группа</label>
                <input type='text' id='group' name='group' value={studentInfo.group} autoComplete="off" onChange={(evt) => setStudentInfo(props => ({ ...props, group: evt.target.value }))} required />

                <div className="input-wrapper">

                    <label htmlFor='password'>Пароль</label>
                    <input type={isShow ? "text" : "password"} id='password' name='password' value={studentInfo.password} autoComplete='off' onChange={(evt) => setStudentInfo(props => ({ ...props, password: evt.target.value }))} required />
                    <button type="button" className="btn-show" onClick={() => setIsShow(!isShow)}><img className='show-image' src="../../../public/showPassword.png" /></button>
                </div>

                <button type="submit" className="btn-save">Сохранить</button>
            </form>
        </div>
    )
}
