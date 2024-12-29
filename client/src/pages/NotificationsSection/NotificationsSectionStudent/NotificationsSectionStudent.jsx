import './NotificationsSectionStudent.scss'
import ChatModalStudent from '../../../widgets/Modal/ChatModal/ChatModalStudent/ChatModalStudent.jsx'
import AskModal from '../../../widgets/Modal/AskModal/AskModal.jsx';
import { useState } from 'react';
import AdList from '../../../widgets/AdList/AdList.jsx';
import DeleteRequest from '../../../widgets/DeleteRequest/DeleteRequest.jsx';
import TicketsListStudent from '../../../widgets/TicketsListStudent/TicketsListStudent.jsx';

export default function NotificationsSectionStudent() {
    const [isAsk, setIsAsk] = useState(false);

    const openModalAsk = () => {
        setIsAsk(true);
    }

    const closeModalAsk = () => {
        setIsAsk(false);
    }


    return (
        <main className='notifications'>

            {isAsk && <AskModal onClickClose={closeModalAsk} />}

            <section className='block-ad'>
                <AdList />
            </section>

            <section className='block-requests'>
                <TicketsListStudent />

                <div className='btn-wrapper'>
                    <button type='button' className='btn-question' onClick={openModalAsk}>Спросить</button>
                </div>
            </section>
        </main >
    )
}