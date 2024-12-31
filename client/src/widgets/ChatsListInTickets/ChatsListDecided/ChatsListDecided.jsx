import ChatsItemDecided from "./ChatsItemDecided"

export default function ChatsListDecided({ tickets }) {
    return (
        <div className="chats-list-wrapper">
            <ul className="chats-list">
                {tickets.map(ticket => {
                    return (
                        <>
                            <ChatsItemDecided ticket={ticket} />
                        </>
                    )
                })}
                {/* <li className='chat-item'>
                    <div className='info-chat-wrapper'>
                        <h3 className='title'>Проблема с доступом к университетской сети</h3>
                        <p className='description'>Уважаемый тьютор, у меня возникли проблемы с
                            доступом к университетской сети Wi-Fi. Я не могу подключиться, скорость
                            очень низкая. Куда мне обратиться для решения данной проблемы?
                        </p>
                    </div>

                    <div className="status-chat-wrapper">
                        <button type='button' className='status-chat decided'>Решено</button>
                        <div className="info-student">
                            <p className='student'>Костылев Эдуард Сергеевич</p>
                            <p className='group'>РИ-230941</p>
                        </div>
                        <button type='button' className='btn-chat' onClick={() => setIsChat(true)}>Чат</button>
                    </div>
                </li> */}

            </ul>
        </div>
    )
}
