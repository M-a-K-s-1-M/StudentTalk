import { useEffect, useState } from 'react';
import AddTutorAdmin from '../../widgets/AddTutorAdmin/AddTutorAdmin';
import './TutorAdmin.scss';
import EditTutorAdmin from '../../widgets/EditTutorAdmin/EditTutorAdmin';
import axios from 'axios';


export default function TutorAdmin() {
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [currentTutor, setCurrentTutor] = useState({});
    const [tutors, setTutors] = useState([]);

    useEffect(() => {
        const getAllTutors = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/tutor/getAllTutor');
                setTutors(data);
            } catch (e) {
                console.log(e);
            }
        }

        getAllTutors();
    }, [])

    return (
        <section className="tutor-admin-container">
            <div className="tutor-admin">
                <div className="tutor-list-container">
                    <h2>Тьютеры</h2>
                    <div className="tutor-list-wrapper">
                        <ul className="tutor-list">
                            {tutors.map(tutor => {
                                return (
                                    <>
                                        <li className='tutor-list-item' key={tutor.id}>
                                            <p className='fio'>{tutor.lastname} {tutor.firstname} {tutor.patronymic}</p>
                                            <button className="btn-more-admin" onClick={() => { setIsAdd(false); setIsEdit(true); setCurrentTutor(tutor) }}>Подробнее</button>
                                        </li>
                                    </>
                                )
                            })}

                        </ul>
                        <div className="btn-wrapper">
                            <button className="btn-add-tutor" onClick={() => { setIsAdd(true), setIsEdit(false) }}>Добавить</button>
                        </div>
                    </div>
                </div>

                {isAdd && <AddTutorAdmin addTutor={newTutor => setTutors([...tutors, newTutor])} />}
                {isEdit && <EditTutorAdmin tutor={currentTutor} deleteTutor={removeTutor => setTutors(tutors.filter(t => t !== removeTutor))} setIsAdd={() => setIsAdd(true)} setIsEdit={() => setIsEdit(false)} />}
            </div>
        </section>
    )
}
