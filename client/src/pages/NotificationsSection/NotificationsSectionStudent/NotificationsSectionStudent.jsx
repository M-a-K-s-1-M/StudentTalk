import './NotificationsSectionStudent.scss'
import ChatModalStudent from '../../../widgets/Modal/ChatModal/ChatModalStudent/ChatModalStudent.jsx'
import AskModal from '../../../widgets/Modal/AskModal/AskModal.jsx';
import { useState } from 'react';
import AdList from '../../../widgets/AdList/AdList.jsx';
import DeleteRequest from '../../../widgets/DeleteRequest/DeleteRequest.jsx';

export default function NotificationsSectionStudent() {
    const [isChat, setIsChat] = useState(false);
    const [isAsk, setIsAsk] = useState(false);

    // проверка статуса у вопроса 
    // const renderRequestItem = (li) => {
    //     const shouldShowDeleteModal = li.className.includes('decided') || li.className.includes('expected');

    //     return (
    //         <li className={li.className}>
    //             {/* ... остальной код li ... */}
    //             {shouldShowDeleteModal && <DeleteModal />}
    //         </li>
    //     );
    // };


    const openModalChat = () => {
        setIsChat(true);
    }

    const closeModalChat = () => {
        setIsChat(false);
    }

    const openModalAsk = () => {
        setIsAsk(true);
    }

    const closeModalAsk = () => {
        setIsAsk(false);
    }


    return (
        <main className='notifications'>

            {isChat && <ChatModalStudent onClickClose={closeModalChat} />}
            {isAsk && <AskModal onClickClose={closeModalAsk} />}

            <section className='block-ad'>
                <AdList />
            </section>

            <section className='block-requests'>
                <ul className='requests-list'>

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

                </ul>

                <div className='btn-wrapper'>
                    <button type='button' className='btn-question' onClick={openModalAsk}>Спросить</button>
                </div>
            </section>
        </main >
    )
}