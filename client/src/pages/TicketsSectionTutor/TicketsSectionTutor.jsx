import { useState } from 'react'
import './TicketsSectionTutor.scss'
import ChatsListResolve from '../../widgets/ChatsListInTickets/ChatListResolve/ChatsListResolve';
import ChatsListDecided from '../../widgets/ChatsListInTickets/ChatsListDecided/ChatsListDecided';
import TicketsList from '../../widgets/TicketsList/TicketsList';

export default function TicketsSectionTutor() {
    const [statusChatList, setStatusChatList] = useState('resolve')


    return (
        <section className="tickets-t">

            <section className='tickets-container'>
                <TicketsList />
            </section>

            <section className='chats-container'>
                <div className='btn-wrapper'>
                    {statusChatList === 'resolve' ? <button className='btn-resolve active'>Решается</button> : <button className='btn-resolve' onClick={() => setStatusChatList('resolve')}>Решается</button>}
                    {statusChatList === 'decided' ? <button className='btn-decided active'>Решено</button> : <button className='btn-decided' onClick={() => setStatusChatList('decided')}>Решено</button>}
                </div>

                {statusChatList === 'resolve' && <ChatsListResolve />}
                {statusChatList === 'decided' && <ChatsListDecided />}
            </section>
        </section>
    )
}