import { useState } from "react";
import { useLocalStorage } from "react-use";

const useAppointmentProvider = () => {
    const [modalFilterDate, setModalFilterDate] = useState(false);
    const [modalFilterTime, setModalFilterTime] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);

    const [newAppointmentData, setNewAppointmentData, removeNewAppointmentData] = useLocalStorage('newAppointment', {});
    const [appointmentsData, setAppointmentsData, removeAppointmentsData] = useLocalStorage('storage', {});
    const [filterData, setFilterData, removeFilterData] = useLocalStorage('filter', {})

    const toggleModalFilterDate = () => {
        modalFilterDate ? setModalFilterDate(false) : setModalFilterDate(true);
    }
    const toggleModalFilterTime = () => {
        modalFilterTime ? setModalFilterTime(false) : setModalFilterTime(true);
    }

    const registerAppointment = async (newAppointment) => {
        try {
            const body = newAppointment;
            const response = await fetch("http://localhost:3333/appointment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            setAppointmentsData(body);
        } catch (error) {
            console.error(error);
        }
    }

    const loadAppointments = async () => {
        const response = await fetch('http://localhost:3333/appointment', {
            method: 'GET'
        });
        const data = await response.json();
        setAppointmentsData(data.appointments);
    }

    const filterAppointments = async (filter, value) => {
        try {
            const response = await fetch(`http://localhost:3333/appointment?filter=${filter}&value=${value}`, {
                method: 'GET'
            });
            const data = await response.json();
            setFilterData(data.appointments);
            setModalFilterDate(false);
            setModalFilterTime(false);
        } catch (error) {
            console.log(error);
        }
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
        registerAppointment,
        loadAppointments,
        filterAppointments,
        filterData,
        setFilterData,
        newAppointmentData,
        setNewAppointmentData,
        removeNewAppointmentData,
        alertMessage,
        setAlertMessage
    }
}

export default useAppointmentProvider;