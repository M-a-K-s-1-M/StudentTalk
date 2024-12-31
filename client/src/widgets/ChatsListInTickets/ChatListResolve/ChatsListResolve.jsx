import ChatsItemResolve from "./ChatsItemResolve";

export default function ChatsListDecided({ tickets }) {
    return (
        <div className="chats-list-wrapper">
            <ul className="chats-list">
                {tickets.map(ticket => {
                    return (
                        <>
                            <ChatsItemResolve ticket={ticket} />
                        </>
                    )
                })}

            </ul>
        </div>
    )
}
