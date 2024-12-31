import { useEffect, useState } from "react";
import ChatTicketModalTutor from '../../widgets/Modal/ChatModal/ChatTicketModalTutor/ChatTicketModalTutor';
import DeleteModal from "../Modal/DeleteModal/DeleteModal";
import { jwtDecode } from "jwt-decode";
import { getOneStudent } from "../../shared/api/studentAPI";

export default function TicketsItemTutor({ ticket, setTickets, setTicketsResolve }) {
    const [isChatTicket, setIsChatTicket] = useState(false);
    const [isAccept, setIsAccept] = useState(false);
    const [student, setStudent] = useState({});
    const tutor = jwtDecode(localStorage.getItem('token'));

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
            {isChatTicket && <ChatTicketModalTutor onClickClose={() => setIsChatTicket(false)} />}

            <li className='ticket-item'>
                <div className='info-ticket-wrapper'>
                    <h3 className='title'>{ticket.title}</h3>
                    <p className='description'>{ticket.description}</p>
                </div>
                <div className='info-student-wrapper'>
                    <div className="info-student">
                        <p className='student'>{student.lastname} {student.firstname} {student.patronymic}</p>
                        <p className='group'>{student.academGroup}</p>
                    </div>
                    <div className="btn-wrapper">
                        <button type='button' className='btn-take-ticket' onClick={() => setIsAccept(true)}>Взять тикет</button>
                        {isAccept && <DeleteModal type='ticket' onClose={() => setIsAccept(false)} ticket={ticket} setTickets={setTickets} setTicketsResolve={setTicketsResolve} />}
                    </div>
                </div>
            </li>
        </>
    )
}
