import './styles.css';

const TableHead = () => {
    return (
        <thead className='table__head'>
            <th className='table__row'>
                <td className='table__head__element'>ID</td>
                <td className='table__head__element'>Nome</td>
                <td className='table__head__element'>Dia do agendamento</td>
                <td className='table__head__element'>Horário do agendamento</td>
                <td className='table__head__element'>Situação</td>
                <td className='table__head__element'>Ações</td>
            </th>
        </thead>
    );
}

export default TableHead;