import axios from "axios";
import './EditStudentAdmin.scss';
import { useEffect, useState } from "react";

export default function EditTutorAdmin({ tickets, student, deleteStudent, setIsEdit, setIsAdd }) {

    const handleUpdateStudent = async (evt) => {
        evt.preventDefault();

        await axios.post('http://localhost:5000/api/student/updateStudent', {
            id: student.id,
            firstname: tutorInfoUpdate.firstname,
            lastname: tutorInfoUpdate.lastname,
            patronymic: tutorInfoUpdate.patronymic,
            email: tutorInfoUpdate.email
        }).then(response => {
            if (!response.data.tutor) {
                alert(response.data.message);
            } else {
                console.log(response.data.tutor)
            }
        }).catch(e => {
            console.log(e);
        })
    }


    const handleDeleteStudent = async (evt) => {
        evt.preventDefault();

        await axios.post('http://localhost:5000/api/student/deleteStudent', { email: student.email })
            .then(response => {
                if (response.status === 200) {
                    deleteStudent(student);
                    setIsAdd();
                    setIsEdit()
                }
            }).catch(e => {
                console.log(e.response);
            })
    }

    return (
        <div className="student-edit-admin-container">
            <h2>Информация</h2>
            <div className="edit-block-wrapper">
                <div className="student-info-wrapper">

                    <form className='student-info'>
                        <label htmlFor='firstname'>Имя</label>
                        <input type='text' id='firstname' name='firstname'
                            value={student.firstname}
                            required />

                        <label htmlFor='lastname'>Фамилия</label>
                        <input type='text' id='lastname' name='lastname'
                            value={student.lastname}
                            required />

                        <label htmlFor='patronymic'>Отчество</label>
                        <input type='text' id='patronymic' name='patronymic'
                            value={student.patronymic}
                            required />

                        <label htmlFor='email'>Почта</label>
                        <input type='text' id='email' name='email'
                            value={student.email}
                            required />

                        <label htmlFor='group'>Группа</label>
                        <input type='text' id='group' name='group'
                            value={student.academGroup}
                            required />

                    </form>

                    <div className="student-ticket-info">
                        <h3 className="ticket-list-title">Тикеты студента</h3>
                        <ul className="ticket-list-student">
                            {tickets && tickets.map(ticket => {
                                return (
                                    <>
                                        <li key={ticket.id} className="ticket-student-item">
                                            <div className="ticket-content-wrapper">
                                                <h4 className="ticket-title">{ticket.title}</h4>
                                                <p className="ticket-description">{ticket.description}</p>
                                            </div>
                                            <div className="btn-wrapper">
                                                <button type="button" className="btn-chat">Чат</button>
                                            </div>
                                        </li>
                                    </>
                                )
                            })}


                            {/* <li className="ticket-student-item">
                                <div className="ticket-content-wrapper">
                                    <h4 className="ticket-title">Проблема с доступом к университетской сети</h4>
                                    <p className="ticket-description">
                                        Уважаемый тьютор, у меня возникли проблемы с доступом
                                        к университетской сети Wi-Fi. Я не могу подключиться, скорость очень низкая.
                                        Куда мне обратиться для решения данной проблемы?
                                    </p>
                                </div>
                                <div className="btn-wrapper">
                                    <button type="button" className="btn-chat">Чат</button>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>

                <div className="btn-edit-wrapper">
                    <button className='btn-delete' onClick={handleDeleteStudent}>Удалить</button>
                    <button className="btn-edit" onClick={handleUpdateStudent}>Изменить</button>
                </div>
            </div>

        </div>
    )
}
