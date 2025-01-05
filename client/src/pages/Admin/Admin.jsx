import { useState } from 'react';
import './Admin.scss';

export default function Admin() {
    const [password, setPassword] = useState('');

    return (
        <section className="admin">
            <form className='admin-form'>
                <label htmlFor='password'>Пароль</label>
                <input type="password" name='password' id="password" autoCapitalize='off' value={password} onChange={(evt) => setPassword(evt.target.value)} required />
                <button className="btn-submit">Войти</button>
            </form>
        </section>
    )
}
