import ReactDOM from 'react-dom';
import './AddDeadlineModal.scss';
import { useState } from 'react';
export default function AddDeadlineModal({ onClickClose }) {
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [objectValue, setObjectValue] = useState('');
    const [dataValue, setDateValue] = useState('');

    return ReactDOM.createPortal(
        <div className="bg-wrapper">
            <section className="add-deadline-container">
                <img className='close-img' src='../../../../public/closeImage.png' width='50' onClick={onClickClose} />
                <form className='form-container'>
                    <label htmlFor='title' className='title-label'>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            className='title-input'
                            value={titleValue}
                            onChange={evt => setTitleValue(evt.target.value)}
                            autoComplete='off'
                            autoCorrect='off'
                            placeholder='Тема'
                            maxLength='50'
                            required />
                    </label>

                    <label htmlFor='description' className='description-label'>
                        <textarea
                            className='description-input'
                            name='description'
                            id='description'
                            placeholder='Описание'
                            value={descriptionValue}
                            onChange={evt => setDescriptionValue(evt.target.value)}

                        />
                    </label>

                    <div className='object-date-container'>
                        <label htmlFor='object' className='object-label'>
                            <input
                                type='text'
                                name='object'
                                id='object'
                                className='object-input'
                                value={objectValue}
                                onChange={evt => setObjectValue(evt.target.value)}
                                autoCorrect='off'
                                placeholder='Предмет'
                                maxLength='30'
                                required
                            />
                        </label>

                        <button type='submit' className='btn-confirm' onClick={evt => { evt.preventDefault() }}>Подтвердить</button>

                        <label htmlFor='date' className='date-label'>
                            <input
                                type='date'
                                name='date'
                                id='date'
                                className='date-input'
                                value={dataValue}
                                onChange={evt => setDateValue(evt.target.value)}
                                required
                            />
                        </label>
                    </div>
                </form>

            </section>
        </div>,
        document.body
    )
}
