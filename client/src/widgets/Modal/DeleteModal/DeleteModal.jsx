import axios from 'axios';
import './DeleteModal.scss';
import { jwtDecode } from 'jwt-decode';
import { deleteDeadline } from '../../../shared/api/deadlineAPI';

export default function DeleteModal({ onClose, type, deadlineItem, onClickMoreModal, setDeleteDeadline }) {
    const student = jwtDecode(localStorage.getItem('token'));

    const handleDelete = async () => {

        onClose();
        onClickMoreModal();

        deleteDeadline(student.id, deadlineItem.id);
        setDeleteDeadline(deadlineItem.id);
    }

    return (
        <>
            {type === 'request' &&
                <section className='delete-container'>
                    <h3 className='title-delete'>Удалить обращение?</h3>
                    <p className='description-delete'>*при подтверждении обращение будет удалено из списка, доступ к просмотру исчезнет.</p>

                    <div className='btn-delete-wrapper'>
                        <button className='btn-yes'>Да</button>
                        <button className='btn-no' onClick={onClose}>Нет</button>
                    </div>
                </section>
            }

            {type === 'deadline' &&
                <section className='delete-container'>
                    <h3 className='title-delete'>Удалить обращение?</h3>
                    <p className='description-delete'>*при подтверждении дедлайн будет удалён из списка, доступ к просмотру исчезнет.</p>

                    <div className='btn-delete-wrapper'>
                        <button className='btn-yes' onClick={handleDelete}>Да</button>
                        <button className='btn-no' onClick={onClose}>Нет</button>
                    </div>
                </section>
            }
        </>
    )
}
