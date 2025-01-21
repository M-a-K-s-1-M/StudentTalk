import axios from 'axios';
import './ProblemModal.scss';

export default function ProblemModal({ onClose, ticket, onClickClose, setTickets, updateTicket }) {
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await axios.post('http://localhost:5000/api/ticket/updateStatus', {
            status: "Решено",
            id: ticket.id,
        }).then(response => {
            setTickets(ticket.id);
            updateTicket(response.data.ticket);
            onClose();
            onClickClose();
        })

    }
    return (
        <section className='problem-container'>
            <h3 className='problem-title'>Ваша проблема решена?</h3>
            <p className='problem-description'>*при подтверждении диалог будет закрыт, доступ к чату будет только в формате просмотра</p>

            <div className="btn-problem-wrapper">
                <button className="btn-yes" onClick={handleSubmit}>Да</button>
                <button className="btn-no" onClick={onClose}>Нет</button>
            </div>
        </section>
    )
}
