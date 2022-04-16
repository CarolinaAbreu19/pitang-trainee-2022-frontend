import './styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
                <tr className='table__row'>
                    <td className='table__element'>{appointment.id}</td>
                    <td>{appointment.name}</td>
                    <td>{appointment.date_appointment}</td>
                    <td>{appointment.time_appointment}</td>
                    <td>{appointment.situation}</td>
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;