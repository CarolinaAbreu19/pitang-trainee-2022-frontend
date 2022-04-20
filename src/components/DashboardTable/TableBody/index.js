import './styles.css';
import { useEffect, useState } from 'react';
import button__delete from '../../../assets/button_delete_table.svg';
import button__attend from '../../../assets/button_attend_table.svg';
import useAppointmentProvider from '../../../hooks/useAppointmentProvider';

const TableBody = () => {
    const [deleteAppointment, setDeleteAppointment] = useState(false);
    const { appointmentsData, loadAppointments, setFilterData, setNewAppointmentData } = useAppointmentProvider();
    
    useEffect(() => {
        try {
            setFilterData([]);
            setNewAppointmentData({});
            loadAppointments();
        } catch (error) {
            console.log(error);
        }
    }, []);

    function handleDelete() {
        !deleteAppointment ? setDeleteAppointment(true) : setDeleteAppointment(false);
    }

    return (
        <div className="table__body">
            { appointmentsData.map((appointment) => (
                    <ul className='table__row' key={appointment.id}>
                        <li className='table__element --id'>{appointment.id}</li>
                        <li className='table__element'>{appointment.name}</li>
                        <li className='table__element'>{appointment.birth_date}</li>
                        <li className='table__element'>{appointment.date_appointment}</li>
                        <li className='table__element'>{appointment.time_appointment}h</li>
                        <li className={`table__element ${appointment.situation === 'waiting' ? '--waiting' : '--done'}`}>{appointment.situation === 'waiting' ? 'Em espera' : 'Atendido'}</li>
                        <li className='table__element action__buttons'>
                            <button className='table__button --attend'><img src={button__attend} alt="Realizar atendimento" /></button>
                            <button className='table__button --delete' onClick={() => handleDelete()}><img src={button__delete} alt="Cancelar agendamento" /></button>
                        </li>
                    </ul>
                ))
            }
        </div>
    );
}

export default TableBody;