import { useState } from "react";
import ChatModalStudent from "../Modal/ChatModal/ChatModalStudent/ChatModalStudent"
import DeleteRequest from "../DeleteRequest/DeleteRequest";



export default function TicketsItemStudent({ ticket, setTickets }) {
    const [isChat, setIsChat] = useState(false);
    const openModalChat = () => {
        setIsChat(true);
    }

    const closeModalChat = () => {
        setIsChat(false);
    }
    return (
        <>
            {isChat && <ChatModalStudent onClickClose={closeModalChat} />}
            <li className='requests-item resolve'>
                <div className='title-container'>
                    <h3>{ticket.title}</h3>
                    {ticket.status === 'Решается' && <button className='btn-status resolve'>{ticket.status}</button>}
                    {ticket.status === 'Ожидает принятия' && <button className='btn-status expected'>{ticket.status}</button>}
                    {ticket.status === 'Решено' && <button className='btn-status decided'>{ticket.status}</button>}

                </div>
                <p className='description'>{ticket.description}</p>
                <div className='btn-wrapper'>
                    {ticket.status === 'Решается' && <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>}
                    {ticket.status === 'Ожидает принятия' && <DeleteRequest ticket={ticket} setTickets={setTickets} />}
                    {ticket.status === 'Решено' && <>
                        <DeleteRequest ticket={ticket} setTickets={setTickets} />
                        <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                    </>}
                </div>
            </li>

        </>
    )
}
