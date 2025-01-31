import { useEffect, useRef, useState } from "react";
import './ChatModalStudent.scss';
import ReactDOM from 'react-dom';
import ProblemModal from "../../../../widgets/Modal/ProblemModal/ProblemModal";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import socket from '../../../../app/socket';

export default function ChatModalStudent({ onClickClose, ticket, setTickets, updateTicket }) {
    const [isProblem, setIsProblem] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const student = jwtDecode(localStorage.getItem('token'));
    const [tutor, setTutor] = useState({});
    const [messages, setMessages] = useState([]);
    const messageList = useRef(null);

    useEffect(() => {
        socket.emit('ROOM:JOIN', {
            ticketId: ticket.id
        })

        const getOneTutor = async () => {
            await axios.post('http://localhost:5000/api/tutor/getOneTutor', {
                tutorId: ticket.tutorId
            }).then(response => {
                setTutor(response.data.tutor);
            }).catch(e => {
                console.log(e);
            })
        }

        const getAllMessages = async () => {
            await axios.post('http://localhost:5000/api/message/getAll', {
                ticketId: ticket.id
            }).then(response => {
                setMessages(response.data.messages);
            }).catch(e => {
                console.log(e);
            })
        }
        getAllMessages();
        getOneTutor();
    }, [])

    useEffect(() => {
        socket.on(`ROOM:NEW_MESSAGE_STUDENT`, ({ message, studentId }) => {
            if (student.id === studentId) {
                setMessages(prevMessages => ([...prevMessages, message]))
            }
        })
    }, [socket])

    useEffect(() => {
        messageList.current.scrollTo(0, 9999999999);
    }, [messages])

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await axios.post('http://localhost:5000/api/message/create', {
            description: textMessage,
            role: student.role,
            ticketId: ticket.id,
        }).then(response => {
            setMessages(prevMessages => ([...prevMessages, response.data.message]))

            socket.emit('ROOM:MESSAGE_STUDENT', {
                message: response.data.message,
                ticketId: ticket.id,
                tutorId: tutor.id,
            })

            setTextMessage('');
        })
    }

    return ReactDOM.createPortal(
        <div className="bg-wrapper">
            <section className="chat-container">
                <img className="close-img" src="../../../../../public/closeImage.png" width='50' onClick={() => { socket.emit('ROOM:LEAVE', { ticketId: ticket.id }); onClickClose() }} />
                {ticket.status === 'Решено' && <div className="status-color decided" />}
                {ticket.status === 'Решается' && <div className="status-color resolve" />}

                <div className="chat-wrapper">


                    <div className="chat" ref={messageList}>
                        <div className="message theme">
                            <h4 className="name">Вы</h4>
                            <div className="description-container">
                                <h3 className="title">{ticket.title}</h3>
                                <p className="description">{ticket.description}</p>
                            </div>
                        </div>

                        <ul className="message-list">
                            {messages.map(message => {
                                return (
                                    <>
                                        {message.role === 'STUDENT' ? <li className="message student">
                                            <h4>Вы</h4>
                                            <div className="description-container">
                                                <p className="description">{message.description}</p>
                                            </div>
                                        </li>
                                            :
                                            <li className="message tutor">
                                                <h4 className="name">{tutor.lastname} {tutor.firstname} {tutor.patronymic}</h4>
                                                <div className="description-container">
                                                    <p className="description">{message.description}</p>
                                                </div>
                                            </li>}
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                {ticket.status === "Решается" && <>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <textarea type='text' placeholder="Сообщение" value={textMessage} onChange={(evt) => setTextMessage(evt.target.value)} required />
                            <button type="submit"><img src="../../../../../public/submit.png" width="30" /></button>
                        </form>
                    </div>

                    <div className="status-container">
                        <a href='#' onClick={(evt) => { evt.preventDefault(); setIsProblem(true) }}>Проблема решена?</a>
                        {isProblem && <ProblemModal onClose={() => setIsProblem(false)} ticket={ticket} onClickClose={onClickClose} setTickets={setTickets} updateTicket={updateTicket} />}
                    </div>
                </>}


            </section>
        </div>,
        document.body
    )
}