import './styles.css';
import NoResults from '../NoResults';

const TableBody = (props) => {

    return (
        <div className="table__body">
            { props.list.length !== 0 ? props.list.map((appointment) => (
                    <ul className='table__row' key={appointment.id}>
                        <li className='table__element --id'>{appointment.id}</li>
                        <li className='table__element'>{appointment.name}</li>
                        <li className='table__element'>{appointment.birth_date}</li>
                        <li className='table__element'>{appointment.date_appointment}</li>
                        <li className='table__element'>{appointment.time_appointment}h</li>
                        <li className={`table__element ${appointment.situation === 'waiting' ? '--waiting' : '--done'}`}>{appointment.situation === 'waiting' ? 'Em espera' : 'Atendido'}</li>
                    </ul>
                )) : <NoResults />
            }
        </div>
    );
}

export default TableBody;