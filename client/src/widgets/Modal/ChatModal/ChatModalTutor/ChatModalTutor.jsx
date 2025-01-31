import ReactDOM from 'react-dom';
import './ChatModalTutor.scss';
import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import socket from '../../../../app/socket';



export default function ChatModalTutor({ onClickClose, ticket, student }) {
    const [textMessage, setTextMessage] = useState('');
    const tutor = jwtDecode(localStorage.getItem('token'));
    const [messages, setMessages] = useState([]);
    const messageList = useRef(null);


    useEffect(() => {
        socket.emit('ROOM:JOIN', {
            ticketId: ticket.id
        })

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
    }, [])


    useEffect(() => {
        socket.on(`ROOM:NEW_MESSAGE_TUTOR`, ({ message, tutorId }) => {
            if (tutor.id === tutorId) {
                setMessages(prevMessages => ([...prevMessages, message]))
            }
        })
    }, [socket])

    useEffect(() => {
        messageList.current.scrollTo(0, 99999999999);
    }, [messages])


    const handleSubmit = async (evt) => {
        evt.preventDefault();

        await axios.post('http://localhost:5000/api/message/create', {
            description: textMessage,
            role: tutor.role,
            ticketId: ticket.id,
        }).then(response => {
            setMessages(prevMessages => ([...prevMessages, response.data.message]))

            socket.emit('ROOM:MESSAGE_TUTOR', {
                message: response.data.message,
                ticketId: ticket.id,
                studentId: student.id
            })

            setTextMessage('');
        })
    }

    return ReactDOM.createPortal(
        <div className="bg-wrapper">
            <section className='chat-container-t'>
                <img className="close-img" src="../../../../../public/closeImage.png" width='50' onClick={() => { socket.emit('ROOM:LEAVE', { ticketId: ticket.id }); onClickClose() }} />
                <div className="status-color resolve" />
                <div className="chat-wrapper">

                    <div className="chat" ref={messageList}>
                        <div className="message theme">
                            <h4 className="name">{student.lastname} {student.firstname} {student.patronymic}</h4>
                            <div className="description-container">
                                <h3 className="title">{ticket.title}</h3>
                                <p className="description">{ticket.description}</p>
                            </div>
                        </div>

                        <ul className="message-list">
                            {messages && messages.map(message => {
                                return (
                                    <>
                                        {message.role === 'TUTOR' ?
                                            <li className="message tutor">
                                                <h4 className="name">Вы</h4>
                                                <div className="description-container">
                                                    <p className="description">{message.description}</p>
                                                </div>
                                            </li>
                                            :
                                            <li className="message student">
                                                <h4>{student.lastname} {student.firstname} {student.patronymic}</h4>
                                                <div className="description-container">
                                                    <p className="description">{message.description}</p>
                                                </div>
                                            </li>
                                        }
                                    </>
                                )
                            })}

                        </ul>
                    </div>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <textarea type='text' placeholder="Сообщение" value={textMessage} onChange={(evt) => setTextMessage(evt.target.value)} required />
                        <button type="submit"><img src="../../../../../public/submit.png" width="30" /></button>
                    </form>
                </div>

                <div className="status-container decided">
                    <p>Вы еще не решили проблему студента</p>
                </div>

                {/* <div className="status-container">
                    <a href='#' onClick={(evt) => { evt.preventDefault(); setIsProblem(true) }}>Проблема решена?</a>
                    {isProblem && <ProblemModal onClose={() => setIsProblem(false)} />}
                </div> */}
            </section>
        </div>,
        document.body
    )
}
