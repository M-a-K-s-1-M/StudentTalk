import { useState } from "react"
import './DeadlineSection.scss'
import AddDeadlineModal from "../../widgets/Modal/AddDeadlineModal/AddDeadlineModal";
import DeadlineList from "../../widgets/DeadlineList/DeadlineList";

export default function DeadlineSection() {
    const [subjectText, setSubjectText] = useState('');
    const [dateText, setDateText] = useState('');
    const [isAddDeadline, setIsAddDeadline] = useState(false);

    return (
        <main className="deadline-container">
            {isAddDeadline && <AddDeadlineModal onClickClose={() => setIsAddDeadline(false)} />}
            <section className="deadline">
                <form className="deadline-form">

                    <div className="input-group">
                        <label htmlFor="date">Дата</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={dateText}
                            onChange={(evt) => setDateText(evt.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="subject">Предмет</label>
                        <input
                            type='text'
                            name='subject'
                            id='subject'
                            value={subjectText}
                            onChange={(evt) => setSubjectText(evt.target.value)}
                        />
                    </div>

                </form>

                <DeadlineList />

                <div className="btn-wrapper">
                    <button className="btn-add" onClick={() => setIsAddDeadline(true)} ><img src='../../../public/plus.png' width='60' /></button>
                </div>

            </section>
        </main>
    )
}