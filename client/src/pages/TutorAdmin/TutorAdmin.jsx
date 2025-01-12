import './TutorAdmin.scss';

export default function TutorAdmin() {
    return (
        <section className="tutor-admin-container">
            <div className="tutor-admin">
                <div className="tutor-list-container">
                    <h2>Тьютеры</h2>
                    <div className="tutor-list-wrapper">
                        <ul className="tutor-list">
                            <li className='tutor-list-item'>
                                <p className='fio'>Емельянов Максим Андреевич</p>
                                <button className="btn-more-admin">Подробнее</button>
                            </li>
                            <li className='tutor-list-item'>
                                <p className='fio'>Емельянов Максим Андреевич</p>
                                <button className="btn-more-admin">Подробнее</button>
                            </li>

                        </ul>
                        <div className="btn-wrapper">
                            <button className="btn-add-tutor">Добавить</button>
                        </div>
                    </div>
                </div>

                <div className='tutor-admin-info-container'>
                    <h2>Информация</h2>
                    <form className='tutor-info'>
                        <label htmlFor='firstname'>Имя</label>
                        <input type='text' id='firstname' name='firstname' required />

                        <label htmlFor='lastname'>Фамилия</label>
                        <input type='text' id='lastname' name='lastname' required />

                        <label htmlFor='patronymic'>Отчество</label>
                        <input type='text' id='patronymic' name='patronymic' required />

                        <label htmlFor='email'>Почта</label>
                        <input type='text' id='email' name='email' required />

                        <label htmlFor='password'>Пароль</label>
                        <input type='password' id='password' name='password' autoComplete='off' required />

                        <button className="btn-save">Сохранить</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
