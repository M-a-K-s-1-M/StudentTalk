import { useState, useEffect } from 'react';
import './AskModal.scss';
import ReactDOM from 'react-dom';
import { createTicket } from '../../../shared/api/ticketAPI';
import socket from '../../../app/socket';

export default function AskModal({ onClickClose, isModalChatOpen, setTickets, student }) {
    const [themeText, setThemeText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        onClickClose();
        const title = themeText;
        const description = descriptionText;
        const studentId = student.id;
        const ticket = await createTicket(title, description, studentId);
        socket.emit('TICKET:CREATE', {
            ticket: ticket
        })
        setTickets(ticket);
    }

    const [currentScrollPosition, setCurrentScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollPosition > currentScrollPosition && window.innerHeight + scrollPosition >= document.body.offsetHeight - document.querySelector('.modal-container').offsetHeight) {
                window.scrollTo({
                    top: document.body.offsetHeight - document.querySelector('.modal-container').offsetHeight,
                    behavior: 'smooth'
                });
            }

            setCurrentScrollPosition(scrollPosition);
        };

        if (isModalChatOpen) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isModalChatOpen]);

    return ReactDOM.createPortal(
        <div className="bg-wrapper">

            <section className='ask-container'>
                <img className="close-img" src="../../../../public/closeImage.png" width='50' onClick={onClickClose} />
                <form className='ask-form' onSubmit={handleSubmit}>
                    <label >
                        <input className='theme-question'
                            type='text'
                            name='theme'
                            id='theme'
                            placeholder='Тема вопроса'
                            autoComplete='off'
                            value={themeText} onChange={(evt) => setThemeText(evt.target.value)}
                            required />
                    </label>
                    <label>
                        <textarea
                            className='description-question'
                            spellCheck='true'
                            id='description'
                            name='description'
                            placeholder='Описание вопроса'
                            value={descriptionText}
                            onChange={(evt) => setDescriptionText(evt.target.value)}
                            required />
                    </label>

                    <div className='btn-wrapper'>
                        <button className='btn-ask' type='submit'>Спросить</button>
                    </div>
                </form>
            </section>
        </div>,
        document.body
    )
}