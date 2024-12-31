import TicketsItemTutor from "../TicketsItemTutor/TicketsItemTutor";


export default function TicketsList({ tickets, setTickets, setTicketsResolve }) {

    return (
        <>

            <ul className='tickets-list'>
                {tickets.map(ticket => {
                    return (
                        <>
                            <TicketsItemTutor ticket={ticket} setTickets={setTickets} setTicketsResolve={setTicketsResolve} />
                        </>
                    )
                })}

            </ul>
        </>
    )
}
