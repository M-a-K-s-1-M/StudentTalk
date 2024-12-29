import { useState } from "react";
import ChatModalStudent from "../Modal/ChatModal/ChatModalStudent/ChatModalStudent"
import DeleteRequest from "../DeleteRequest/DeleteRequest";



export default function TicketsItemStudent() {
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
                    <h3>Проблема с доступом к университетской сети</h3>
                    <button className='btn-status resolve'>Решается</button>
                </div>
                <p className='description'>Уважаемый [Имя куратора], у меня возникли
                    проблемы с доступом к университетской сети Wi-Fi. Я не могу подключиться,
                    скорость очень низкая. Куда мне обратиться для решения данной проблемы?</p>
                <div className='btn-wrapper'>
                    <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>

                </div>
            </li>

            <li className='requests-item decided'>
                <div className='title-container'>
                    <h3>Вопрос по поводу изменения расписания занятий</h3>
                    <button className='btn-status decided'>Решено</button>
                </div>
                <p className='description'>Уважаемый куратор, у меня возникли вопросы по поводу изменений в расписании
                    занятий по Программированию для группы РТФ-212. Мне стало известно, что занятия 26 октября
                    будут проходить...
                </p>
                <div className='btn-wrapper'>
                    <DeleteRequest />
                    <button className='btn-chat' type='button' onClick={openModalChat}>Чат</button>
                </div>
            </li>

            <li className='requests-item expected'>
                <div className='title-container'>
                    <h3>Необходимость уточнения деталей переноса занятий</h3>
                    <button className='btn-status expected'>Ожидает принятия</button>
                </div>
                <p className='description'>Здравствуйте, уважаемый куратор! Я хотел бы получить дополнительные разъяснения по поводу переноса занятий по Программированию....</p>
                <div className='btn-wrapper'>
                    <DeleteRequest />
                </div>
            </li>
        </>
    )
}
