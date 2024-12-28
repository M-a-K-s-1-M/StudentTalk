import { useEffect, useState } from "react";
import DeadlineItem from "./DeadlineItem"
import { fetchDeadlines } from "../../shared/api/deadlineAPI";
import { jwtDecode } from "jwt-decode";

export default function DeadlineList({ deadlines, setDeadlines, setDeleteDeadline }) {

    const getDeadlines = async (studentId) => {
        const data = await fetchDeadlines(studentId);
        setDeadlines(data)
    }

    useEffect(() => {
        const student = jwtDecode(localStorage.getItem('token'));
        getDeadlines(student.id)
    }, [])

    return (

        <ul className="deadline-list">
            {deadlines.map(d => {
                return (
                    <>
                        <DeadlineItem key={d.id} deadlineItem={d} setDeleteDeadline={setDeleteDeadline} />
                    </>
                )
            })}

        </ul>
    )
}
