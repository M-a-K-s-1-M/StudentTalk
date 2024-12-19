import { useState } from "react"
import './DeadlineSection.scss'
import MoreModal from "../../widgets/Modal/MoreModal/MoreModal";
import AddDeadlineModal from "../../widgets/Modal/AddDeadlineModal/AddDeadlineModal";

export default function DeadlineSection() {
    const [subjectText, setSubjectText] = useState('');
    const [dataText, setDataText] = useState('');
    const [isAddDeadline, setIsAddDeadline] = useState(false);

    const [isModalMore, setIsModalMore] = useState(false);

    const openModalMore = () => {
        setIsModalMore(true);
    }

    const closeModalMore = () => {
        setIsModalMore(false);
    }

    return (
        <main className="deadline-container">
            {isModalMore && <MoreModal onClickClose={closeModalMore} />}
            {isAddDeadline && <AddDeadlineModal onClickClose={() => setIsAddDeadline(false)} />}
            <section className="deadline">
                <form className="deadline-form">

                    <div className="input-group">
                        <label htmlFor="date">Дата</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={dataText}
                            onChange={(evt) => setDataText(evt.target.value)}
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

                <ul className="deadline-list">
                    <li className="deadline-item">
                        <div className="object-container">
                            <p className="description">Лабораторная работа</p>
                            <p className="object">Физика</p>
                        </div>
                        <p className="date">12 апреля 2025</p>
                        <button className='btn-more' type='button' onClick={openModalMore}>Подробнее</button>
                    </li>
                </ul>

                <div className="btn-wrapper">
                    <button className="btn-add" onClick={() => setIsAddDeadline(true)} ><img src='../../../public/plus.png' width='60' /></button>
                </div>

            </section>
        </main>
    )
}