import { useEffect, useState } from "react";
import { useUserStore } from '../../app/Stores/useUserStore'
import DeadlineItem from "./DeadlineItem"
import { fetchDeadlines } from "../../shared/api/deadlineAPI";
import { useDeadlineStore } from "../../app/Stores/useDeadlineStore"

export default function DeadlineList() {
    const { setDeadline, deadline } = useDeadlineStore()
    const [deadlines, setDeadlines] = useState([]);
    const { student } = useUserStore()

    const getDeadlines = async (studentId) => {
        let data = await fetchDeadlines(studentId);
        setDeadline(data)
    }

    useEffect(() => {
        getDeadlines(1)
    }, [])

    return (

        <ul className="deadline-list">
            {deadline.map(d => {
                return (
                    <>
                        <DeadlineItem key={d.id} deadlineItem={d} />
                    </>
                )
            })}

        </ul>
    )
}
