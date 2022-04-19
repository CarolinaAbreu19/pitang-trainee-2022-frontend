import { useState } from "react";

const useAppointmentProvider = () => {
    const [modalFilterDate, setModalFilterDate] = useState(false);
    const [modalFilterTime, setModalFilterTime] = useState(false);
    const [appointmentsData, setAppointmentsData] = useState([]);

    const toggleModalFilterDate = () => {
        modalFilterDate ? setModalFilterDate(false) : setModalFilterDate(true);
    }
    const toggleModalFilterTime = () => {
        modalFilterTime ? setModalFilterTime(false) : setModalFilterTime(true);
    }

    const loadAppointments = async () => {
        const response = await fetch('http://localhost:3333/appointment', {
            method: 'GET'
        });
        const data = await response.json();
        setAppointmentsData(data.appointments);
    }

    const filterAppointments = async (filter, value) => {
        const response = await fetch(`http://localhost:3000/appointments?filter=${filter}&value=${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setAppointmentsData(data.appointments);
    }

    return {
        modalFilterDate,
        setModalFilterDate,
        modalFilterTime,
        setModalFilterTime,
        appointmentsData,
        setAppointmentsData,
        toggleModalFilterDate,
        toggleModalFilterTime,
        loadAppointments,
        filterAppointments
    }
}

export default useAppointmentProvider;