import { useEffect, useState } from 'react'
import './TicketsSectionTutor.scss'
import ChatsListResolve from '../../widgets/ChatsListInTickets/ChatListResolve/ChatsListResolve';
import ChatsListDecided from '../../widgets/ChatsListInTickets/ChatsListDecided/ChatsListDecided';
import TicketsList from '../../widgets/TicketsList/TicketsList';
import { fetchTickets } from '../../shared/api/ticketAPI';
import { jwtDecode } from 'jwt-decode';

export default function TicketsSectionTutor() {
    const [statusChatList, setStatusChatList] = useState('resolve')
    const [ticketsExpected, setTicketsExpected] = useState([]);
    const [ticketsResolve, setTicketsResolve] = useState([]);
    const [ticketsDecided, setTicketsDecided] = useState([]);
    const tutor = jwtDecode(localStorage.getItem('token'));


    useEffect(() => {
        const getTicketsExpected = async () => {
            const status = 'Ожидает принятия';
            const studentId = null;
            const tutorId = null;
            const data = await fetchTickets(studentId, tutorId, status);
            setTicketsExpected(data);
        }

        const getTicketsResolve = async () => {
            const studentId = null;
            const tutorId = tutor.id;
            const status = 'Решается';

            const data = await fetchTickets(studentId, tutorId, status)
            setTicketsResolve(data);
        }

        const getTicketsDecided = async () => {
            const studentId = null;
            const tutorId = null;
            const status = 'Решено';

            const data = await fetchTickets(studentId, tutorId, status);
            setTicketsDecided(data);
        }

        getTicketsExpected();
        getTicketsResolve();
        getTicketsDecided();
    }, [])


    return (
        <section className="tickets-t">

            <section className='tickets-container'>
                <TicketsList tickets={ticketsExpected} setTickets={id => setTicketsExpected(ticketsExpected.filter(t => t.id !== id))} setTicketsResolve={ticket => setTicketsResolve([...ticketsResolve, ticket])} />
            </section>

            <section className='chats-container'>
                <div className='btn-wrapper'>
                    {statusChatList === 'resolve' ? <button className='btn-resolve active'>Решается</button> : <button className='btn-resolve' onClick={() => setStatusChatList('resolve')}>Решается</button>}
                    {statusChatList === 'decided' ? <button className='btn-decided active'>Решено</button> : <button className='btn-decided' onClick={() => setStatusChatList('decided')}>Решено</button>}
                </div>

                {statusChatList === 'resolve' && <ChatsListResolve tickets={ticketsResolve} />}
                {statusChatList === 'decided' && <ChatsListDecided tickets={ticketsDecided} />}
            </section>
        </section>
    )
}