import { useState, useEffect } from "react";
import ChatModalTutor from "../../Modal/ChatModal/ChatModalTutor/ChatModalTutor";
import { getOneStudent } from "../../../shared/api/studentAPI";

export default function ChatsItemDecided({ ticket }) {
    const [isChat, setIsChat] = useState(false);
    const [student, setStudent] = useState({});

    useEffect(() => {
        const getStudent = async (studentId) => {
            const id = studentId;
            const data = await getOneStudent(id);
            setStudent(data.student);
        }

        getStudent(ticket.studentId);
    }, [])

    return (
        <>
            {student && <>
                {isChat && <ChatModalTutor onClickClose={() => setIsChat(false)} ticket={ticket} student={student} />}

                <li className='chat-item'>
                    <div className='info-chat-wrapper'>
                        <h3 className='title'>{ticket.title}</h3>
                        <p className='description'>{ticket.description}
                        </p>
                    </div>

                    <div className="status-chat-wrapper">
                        <button type='button' className='status-chat resolve'>Решается</button>
                        <div className="info-student">
                            <p className='student'>{student.lastname} {student.firstname} {student.patronymic}</p>
                            <p className='group'>{student.academGroup}</p>
                        </div>
                        <button type='button' className='btn-chat' onClick={() => setIsChat(true)}>Чат</button>
                    </div>
                </li>
            </>}
        </>
    )
}
