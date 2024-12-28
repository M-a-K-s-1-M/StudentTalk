import ReactDOM from 'react-dom';
import './AddDeadlineModal.scss';
import { useState } from 'react';
import { createDeadline } from '../../../shared/api/deadlineAPI';
import { jwtDecode } from 'jwt-decode';

export default function AddDeadlineModal({ onClickClose, setDeadlines }) {
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [objectValue, setObjectValue] = useState('');
    const [dataValue, setDateValue] = useState('');
    const student = jwtDecode(localStorage.getItem('token'));

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        onClickClose();

        const data = await createDeadline(titleValue, descriptionValue, objectValue, dataValue, student.id);
        console.log(data);
        setDeadlines(data);

    }

    return ReactDOM.createPortal(
        <div className="bg-wrapper">
            <section className="add-deadline-container">
                <img className='close-img' src='../../../../public/closeImage.png' width='50' onClick={onClickClose} />
                <form className='form-container' onSubmit={handleSubmit}>
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

                        <button type='submit' className='btn-confirm'>Подтвердить</button>

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
