import axios from 'axios';
import './DeleteModal.scss';
import { useUserStore } from '../../../app/Stores/useUserStore';
import { useDeadlineStore } from '../../../app/Stores/useDeadlineStore';

export default function DeleteModal({ onClose, type, deadlineItem, onClickMoreModal }) {
    const { student } = useUserStore();
    const { deadline, setDeadline } = useDeadlineStore();

    const handleDelete = async () => {
        onClose();
        onClickMoreModal();
        await axios.post('http://localhost:5000/api/deadline/delete', {
            studentId: 1,
            deadlineId: deadlineItem.id,
        }).then(response => {
            setDeadline(response.data);
        }).catch(e => {
            console.log(e);
        })
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
