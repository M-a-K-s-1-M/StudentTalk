import './NotificationsSectionStudent.scss'
import AskModal from '../../../widgets/Modal/AskModal/AskModal.jsx';
import { useState, useEffect } from 'react';
import AdList from '../../../widgets/AdList/AdList.jsx';
import TicketsListStudent from '../../../widgets/TicketsListStudent/TicketsListStudent.jsx';
import { fetchTickets } from '../../../shared/api/ticketAPI.jsx';
import { jwtDecode } from 'jwt-decode';


export default function NotificationsSectionStudent() {
    const [isAsk, setIsAsk] = useState(false);
    const [tickets, setTickets] = useState([]);
    const student = jwtDecode(localStorage.getItem('token'));

    useEffect(() => {
        const getTickets = async (studentId) => {
            const data = await fetchTickets(studentId);
            setTickets(data);
        }

        getTickets(student.id);

    }, [])

    const openModalAsk = () => {
        setIsAsk(true);
    }

    const closeModalAsk = () => {
        setIsAsk(false);
    }



    return (
        <main className='notifications'>

            {isAsk && <AskModal onClickClose={closeModalAsk} setTickets={ticket => (setTickets([...tickets, ticket]))} student={student} />}

            <section className='block-ad'>
                <AdList />
            </section>

            <section className='block-requests'>
                <TicketsListStudent tickets={tickets} setTickets={(ticketId) => setTickets(tickets.filter(t => t.id !== ticketId))} updateTicket={(newTicket) => setTickets(prevTickets => [...prevTickets, newTicket])} />

                <div className='btn-wrapper'>
                    <button type='button' className='btn-question' onClick={openModalAsk}>Спросить</button>
                </div>
            </section>
        </main >
    )
}