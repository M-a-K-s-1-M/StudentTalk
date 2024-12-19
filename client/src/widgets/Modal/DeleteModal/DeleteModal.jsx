import './DeleteModal.scss';

export default function DeleteModal({ onClose, type }) {
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
                        <button className='btn-yes'>Да</button>
                        <button className='btn-no' onClick={onClose}>Нет</button>
                    </div>
                </section>
            }

            {/* <section className='delete-container'>
                <h3 className='title-delete'>Удалить обращение?</h3>
                <p className='description-delete'>*при подтверждении обращение будет удалено из списка, доступ к просмотру исчезнет.</p>

                <div className='btn-delete-wrapper'>
                    <button className='btn-yes'>Да</button>
                    <button className='btn-no' onClick={onClose}>Нет</button>
                </div>
            </section> */}
        </>
    )
}
