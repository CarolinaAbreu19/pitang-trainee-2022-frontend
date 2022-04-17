import './styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import button__edit from '../../../assets/button_edit_table.svg';
import button__delete from '../../../assets/button_delete_table.svg';

const TableBody = () => {

    const [appointmentsData, setAppointmentsData] = useState([]);

    useEffect(() => {
        try {
            async function loadAppointments() {
                const response = await fetch('http://localhost:3333/appointment', {
                    method: 'GET'
                });
                const data = await response.json();
                setAppointmentsData(data.appointments);
            }
            loadAppointments();
        } catch (error) {
            console.log(error);
        }
    }, []);


    return (
        <tbody className="table__body">
            { appointmentsData.map((appointment) => (
                <tr className='table__row' key={appointment.id}>
                    <td className='table__element --id'>{appointment.id}</td>
                    <td className='table__element'>{appointment.name}</td>
                    <td className='table__element'>{appointment.birth_date}</td>
                    <td className='table__element'>{appointment.date_appointment}</td>
                    <td className='table__element'>{appointment.time_appointment}h</td>
                    <td className={`table__element ${appointment.situation === 'waiting' ? '--waiting' : '--done'}`}>{appointment.situation === 'waiting' ? 'Em espera' : 'Atendido'}</td>
                    <td className='table__element action__buttons'>
                        <button className='table__button'><img src={button__edit} alt="Editar agendamento" /></button>
                        <button className='table__button'><img src={button__delete} alt="Excluir agendamento" /></button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;