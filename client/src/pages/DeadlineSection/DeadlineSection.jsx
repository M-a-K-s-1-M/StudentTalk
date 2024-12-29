import { useState } from "react"
import './DeadlineSection.scss'
import AddDeadlineModal from "../../widgets/Modal/AddDeadlineModal/AddDeadlineModal";
import DeadlineList from "../../widgets/DeadlineList/DeadlineList";
import { fetchDeadlines, getFilterDeadlines } from "../../shared/api/deadlineAPI";
import { jwtDecode } from "jwt-decode";

export default function DeadlineSection() {
    const [objectText, setObjectText] = useState('');
    const [dateText, setDateText] = useState('');
    const [isAddDeadline, setIsAddDeadline] = useState(false);
    const [deadlines, setDeadlines] = useState([]);
    const student = jwtDecode(localStorage.getItem('token'));

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const data = await getFilterDeadlines(dateText, objectText, student.id)
        setDeadlines(data);
    }

    const handleResetFilter = async (evt) => {
        evt.preventDefault();

        setDateText('');
        setObjectText('');
        const data = await fetchDeadlines(student.id);
        setDeadlines(data);
    }

    return (
        <main className="deadline-container">
            {isAddDeadline && <AddDeadlineModal onClickClose={() => setIsAddDeadline(false)} setDeadlines={(data) => setDeadlines(d => ([...d, data]))} />}
            <section className="deadline">
                <form className="deadline-form" onSubmit={handleSubmit}>

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
                            value={objectText}
                            onChange={(evt) => setObjectText(evt.target.value)}
                        />
                    </div>

                    <div className="btn-wrapper">
                        {(dateText || objectText) &&
                            <div className="btn-reset-filter-wrapper">
                                <button className="btn-reset-filter" onClick={handleResetFilter}>Сбросить фильтры</button>
                            </div>
                        }
                        <button type="submit" className="btn-search"><img src="../../../public/search.png" width="40" /></button>
                    </div>


                </form>

                <DeadlineList deadlines={deadlines} setDeadlines={(data) => setDeadlines(data)} setDeleteDeadline={(id) => setDeadlines(deadlines.filter(d => d.id !== id))} />

                <div className="btn-wrapper">
                    <button className="btn-add" onClick={() => setIsAddDeadline(true)} ><img src='../../../public/plus.png' width='60' /></button>
                </div>

            </section>
        </main>
    )
}