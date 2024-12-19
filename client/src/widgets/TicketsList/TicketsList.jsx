import { useState } from "react"
import ChatTicketModalTutor from "../../widgets/Modal/ChatModal/ChatTicketModalTutor/ChatTicketModalTutor"

export default function TicketsList() {
    const [isChatTicket, setIsChatTicket] = useState(false);

    return (
        <>
            {isChatTicket && <ChatTicketModalTutor onClickClose={() => setIsChatTicket(false)} />}

            <ul className='tickets-list'>
                <li className='ticket-item'>
                    <div className='info-ticket-wrapper'>
                        <h3 className='title'>Необходимость уточнения деталей переноса занятий</h3>
                        <p className='description'>Здравствуйте, уважаемый куратор! Я хотел бы получить
                            дополнительные разъяснения по поводу переноса занятий
                            по Программированию на 26 октября в аудиторию 205.
                            Существуют ли другие изменения в расписании или требования
                            к подготовке к занятиям, о которых нам следует знать?
                        </p>
                    </div>
                    <div className='info-student-wrapper'>
                        <div className="info-student">
                            <p className='student'>Костылев Эдуард Сергеевич</p>
                            <p className='group'>РИ-230941</p>
                        </div>
                        <button type='button' className='btn-take-ticket' onClick={() => setIsChatTicket(true)}>Взять тикет</button>
                    </div>
                </li>

            </ul>
        </>
    )
}
