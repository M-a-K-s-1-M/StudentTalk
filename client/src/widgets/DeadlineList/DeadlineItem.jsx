import { useState } from 'react'
import MoreModal from '../Modal/MoreModal/MoreModal';

export default function DeadlineItem({ deadlineItem }) {
    const [isModalMore, setIsModalMore] = useState(false);

    const openModalMore = () => {
        setIsModalMore(true);
    }

    const closeModalMore = () => {
        setIsModalMore(false);
    }
    return (
        <>
            {isModalMore && <MoreModal deadlineItem={deadlineItem} onClickClose={closeModalMore} />}
            <li className="deadline-item">
                <div className="object-container">
                    <p className="description">{deadlineItem.title}</p>
                    <p className="object">{deadlineItem.object}</p>
                </div>
                <p className="date">{deadlineItem.date}</p>
                <button className='btn-more' type='button' onClick={openModalMore}>Подробнее</button>
            </li>
        </>
    )
}
