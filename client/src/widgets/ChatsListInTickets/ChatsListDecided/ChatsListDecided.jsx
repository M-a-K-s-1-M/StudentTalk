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
            </ul>
        </div>
    )
}
