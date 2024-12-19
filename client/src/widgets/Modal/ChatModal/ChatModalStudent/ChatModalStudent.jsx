import { useState } from "react";
import './ChatModalStudent.scss';
import ReactDOM from 'react-dom';
import ProblemModal from "../../../../widgets/Modal/ProblemModal/ProblemModal";

export default function ChatModalStudent({ onClickClose }) {
    const [isProblem, setIsProblem] = useState(false);

    const [textMessage, setTextMessage] = useState('');

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(evt.target.value)
    }

    return ReactDOM.createPortal(
        <div className="bg-wrapper">
            <section className="chat-container">
                <img className="close-img" src="../../../../../public/closeImage.png" width='50' onClick={onClickClose} />
                <div className="status-color resolve" />
                <div className="chat-wrapper">


                    <div className="chat">
                        <div className="message theme">
                            <h4 className="name">Иванов Иван Николаевич</h4>
                            <div className="description-container">
                                <h3 className="title">Проблема с доступом к университетской сети</h3>
                                <p className="description">Уважаемый [Имя куратора], у меня возникли проблемы с доступом
                                    к университетской сети Wi-Fi. Я не могу подключиться, скорость очень низкая.
                                    Куда мне обратиться для решения данной проблемы?</p>
                            </div>
                        </div>

                        <ul className="message-list">
                            <li className="message tutor">
                                <h4 className="name">Тьютор</h4>
                                <div className="description-container">
                                    <p className="description">Мы работаем над решением вашей проблемы</p>
                                </div>
                            </li>

                            <li className="message student">
                                <h4>Иванов Иван Николаевич</h4>
                                <div className="description-container">
                                    <p className="description">Ответ студента</p>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <textarea type='text' placeholder="Сообщение" value={textMessage} onChange={(evt) => setTextMessage(evt.target.value)} required />
                        <button type="submit"><img src="../../../../../public/submit.png" width="30" /></button>
                    </form>
                </div>

                <div className="status-container">
                    <a href='#' onClick={(evt) => { evt.preventDefault(); setIsProblem(true) }}>Проблема решена?</a>
                    {isProblem && <ProblemModal onClose={() => setIsProblem(false)} />}
                </div>


            </section>
        </div>,
        document.body
    )
}