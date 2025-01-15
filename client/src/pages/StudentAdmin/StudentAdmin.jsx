import { useEffect, useState } from 'react';
import './StudentAdmin.scss';
import axios from 'axios';
import AddStudentAdmin from '../../widgets/AddStudentAdmin/AddStudentAdmin';
import EditStudentAdmin from '../../widgets/EditStudentAdmin/EditStudentAdmin';


export default function StudentAdmin() {
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [currentStudent, setCurrentStudent] = useState({});
    const [students, setStudents] = useState([]);
    const [ticketsCurrentStudent, setTicketsCurrentStudent] = useState([]);

    useEffect(() => {
        const getAllStudents = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/student/getAllStudent');
                setStudents(data);
            } catch (e) {
                console.log(e);
            }
        }

        getAllStudents();
    }, [])

    const getAllTicketsCurrentStudent = async (student) => {
        const { data } = await axios.post('http://localhost:5000/api/ticket/getAll', {
            studentId: student.id
        })
        setTicketsCurrentStudent(data);
    }

    return (
        <section className="student-admin-container">
            <div className="student-admin">
                <div className="student-list-container">
                    <h2>Студенты</h2>
                    <div className="student-list-wrapper">
                        <ul className="student-list">
                            {students.map(student => {
                                return (
                                    <>
                                        <li className='student-list-item' key={student.id}>
                                            <p className='fio'>{student.lastname} {student.firstname} {student.patronymic}</p>
                                            <button className="btn-more-admin" onClick={() => { setIsAdd(false); setIsEdit(true); setCurrentStudent(student); getAllTicketsCurrentStudent(student) }}>Подробнее</button>
                                        </li>
                                    </>
                                )
                            })}

                        </ul>
                        <div className="btn-wrapper">
                            <button className="btn-add-student" onClick={() => { setIsAdd(true), setIsEdit(false) }}>Добавить</button>
                        </div>
                    </div>
                </div>

                {isAdd && <AddStudentAdmin addStudent={newStudent => setStudents([...students, newStudent])} />}
                {isEdit && <EditStudentAdmin tickets={ticketsCurrentStudent} student={currentStudent} deleteStudent={removeStudent => setStudents(students.filter(s => s !== removeStudent))} setIsAdd={() => setIsAdd(true)} setIsEdit={() => setIsEdit(false)} />}
            </div>
        </section>
    )
}
