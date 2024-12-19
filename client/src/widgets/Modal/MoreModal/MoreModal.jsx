import { useState } from 'react'
import './MoreModal.scss'
import ReactDOM from 'react-dom'
import DeleteModal from '../DeleteModal/DeleteModal';


export default function MoreModal({ onClickClose }) {
    const [isDelete, setIsDelete] = useState(false);

    return ReactDOM.createPortal(
        <div className='bg-wrapper'>
            <section className="more-container">
                <img className='close-img' src='../../../../public/closeImage.png' width='50' onClick={onClickClose} />
                <h3 className='title-deadline'>
                    Лабораторная по Физике 12 апреля 13:30
                </h3>
                <div className='description-deadline-container'>
                    <p className='description'>
                        Лабораторная по силе трения
                        <br /><br />
                        С собой:<br />
                        Отчет<br />
                        Конспект
                        <br /><br />
                        Р-333

                    </p>

                    <button className="btn-delete" onClick={() => setIsDelete(true)}><img src='../../../../public/trash.svg' /></button>
                    {isDelete && <DeleteModal onClose={() => setIsDelete(false)} type='deadline' />}
                </div>

                <div className='deadline-info'>
                    <p className='object'>Физика</p>
                    <p className='time'>12.04.25</p>
                </div>
            </section>
        </div>,
        document.body
    )
}