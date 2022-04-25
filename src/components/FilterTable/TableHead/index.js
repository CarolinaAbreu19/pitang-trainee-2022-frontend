import './styles.css';

const TableHead = () => {
    return (
        <div className='table__head'>
            <ul className='table__row'>
                <li className='table__head__element'>ID</li>
                <li className='table__head__element'>Nome</li>
                <li className='table__head__element'>Data de nascimento</li>
                <li className='table__head__element'>Dia do agendamento</li>
                <li className='table__head__element'>Horário do agendamento</li>
                <li className='table__head__element'>Situação</li>
            </ul>
        </div>
    );
}

export default TableHead;