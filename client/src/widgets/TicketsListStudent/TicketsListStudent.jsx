import TicketsItemStudent from "../TicketsItemStudent/TicketsItemStudent";

export default function TicketsListStudent({ tickets, setTickets, updateTicket }) {
    return (
        <ul className='requests-list'>
            {tickets.map(ticket => {
                return (
                    <>
                        <TicketsItemStudent
                            ticket={ticket}
                            setTickets={setTickets}
                            updateTicket={updateTicket}
                        />
                    </>
                )
            })}
        </ul>
    )
}
