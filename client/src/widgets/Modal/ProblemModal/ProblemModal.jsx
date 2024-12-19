import './ProblemModal.scss';

export default function ProblemModal({ onClose }) {
    return (
        <section className='problem-container'>
            <h3 className='problem-title'>Ваша проблема решена?</h3>
            <p className='problem-description'>*при подтверждении диалог будет закрыт, доступ к чату будет только в формате просмотра</p>

            <div className="btn-problem-wrapper">
                <button className="btn-yes">Да</button>
                <button className="btn-no" onClick={onClose}>Нет</button>
            </div>
        </section>
    )
}
