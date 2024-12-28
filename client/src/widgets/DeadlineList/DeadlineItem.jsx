import { useState } from 'react'
import MoreModal from '../Modal/MoreModal/MoreModal';
import { deleteDeadline } from '../../shared/api/deadlineAPI';

export default function DeadlineItem({ deadlineItem, setDeleteDeadline }) {
    const [isModalMore, setIsModalMore] = useState(false);

    const openModalMore = () => {
        setIsModalMore(true);
    }

    const closeModalMore = () => {
        setIsModalMore(false);
    }
    return (
        <>
            {isModalMore && <MoreModal deadlineItem={deadlineItem} onClickClose={closeModalMore} setDeleteDeadline={setDeleteDeadline} />}
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
