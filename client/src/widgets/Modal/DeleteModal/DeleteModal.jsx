import axios from 'axios';
import './DeleteModal.scss';
import { jwtDecode } from 'jwt-decode';
import { deleteDeadline } from '../../../shared/api/deadlineAPI';
import { deleteTicket } from '../../../shared/api/ticketAPI';
import { updateStatus, updateTutor } from '../../../shared/api/ticketAPI';
export default function DeleteModal({ onClose, type, deadlineItem, onClickMoreModal, setDeleteDeadline, ticket, setTickets, setTicketsResolve }) {
    const student = jwtDecode(localStorage.getItem('token'));
    const tutor = jwtDecode(localStorage.getItem('token'));

    const handleDeleteTicket = async () => {
        onClose();
        const ticketId = ticket.id;
        const data = await deleteTicket(ticketId);
        setTickets(ticketId);
        alert(data.message);
    }

    const handleDeleteDeadline = async () => {

        onClose();
        onClickMoreModal();

        deleteDeadline(student.id, deadlineItem.id);
        setDeleteDeadline(deadlineItem.id);
    }

    const handleAcceptTicket = async () => {
        onClose();
        const id = ticket.id;
        setTickets(id);
        const status = 'Решается';
        const tutorId = tutor.id;

        await updateStatus(status, id);
        const data = await updateTutor(tutorId, id);
        alert(data.message);
        setTicketsResolve(ticket);

    }

    return (
        <>
            {type === 'request' &&
                <section className='delete-container'>
                    <h3 className='title-delete'>Удалить обращение?</h3>
                    <p className='description-delete'>*при подтверждении обращение будет удалено из списка, доступ к просмотру исчезнет.</p>

                    <div className='btn-delete-wrapper'>
                        <button className='btn-yes' onClick={handleDeleteTicket}>Да</button>
                        <button className='btn-no' onClick={onClose}>Нет</button>
                    </div>
                </section>
            }

            {type === 'deadline' &&
                <section className='delete-container'>
                    <h3 className='title-delete'>Удалить обращение?</h3>
                    <p className='description-delete'>*при подтверждении дедлайн будет удалён из списка, доступ к просмотру исчезнет.</p>

                    <div className='btn-delete-wrapper'>
                        <button className='btn-yes' onClick={handleDeleteDeadline}>Да</button>
                        <button className='btn-no' onClick={onClose}>Нет</button>
                    </div>
                </section>
            }

            {type === 'ticket' &&
                <section className='delete-container'>
                    <h3 className='title-delete'>Вы хотите взять этот тикет?</h3>

                    <div className='btn-delete-wrapper'>
                        <button className='btn-yes' onClick={handleAcceptTicket}>Да</button>
                        <button className='btn-no' onClick={onClose}>Нет</button>
                    </div>
                </section>
            }

        </>
    )
}
