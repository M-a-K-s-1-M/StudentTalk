import { useState } from 'react'
import './MoreModal.scss'
import ReactDOM from 'react-dom'
import DeleteModal from '../DeleteModal/DeleteModal';


export default function MoreModal({ deadlineItem, onClickClose }) {
    const [isDelete, setIsDelete] = useState(false);

    return ReactDOM.createPortal(
        <div className='bg-wrapper'>
            <section className="more-container">
                <img className='close-img' src='../../../../public/closeImage.png' width='50' onClick={onClickClose} />
                <h3 className='title-deadline'>
                    {deadlineItem.title}
                </h3>
                <div className='description-deadline-container'>
                    <p className='description'>
                        {deadlineItem.description}
                    </p>

                    <button className="btn-delete" onClick={() => setIsDelete(true)}><img src='../../../../public/trash.svg' /></button>
                    {isDelete && <DeleteModal onClose={() => setIsDelete(false)} type='deadline' deadlineItem={deadlineItem} onClickMoreModal={onClickClose} />}
                </div>

                <div className='deadline-info'>
                    <p className='object'>{deadlineItem.object}</p>
                    <p className='time'>{deadlineItem.date}</p>
                </div>
            </section>
        </div>,
        document.body
    )
}