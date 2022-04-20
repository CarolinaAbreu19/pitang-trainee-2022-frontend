import { useState } from "react";
import { useLocalStorage } from "react-use";

const useAppointmentProvider = () => {
    const [modalFilterDate, setModalFilterDate] = useState(false);
    const [modalFilterTime, setModalFilterTime] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    const [alertStatus, setAlertStatus] = useState({
        alert: '',
        message: ''
    })

    const [newAppointmentData, setNewAppointmentData] = useLocalStorage('newAppointment', {});
    const [appointmentsData, setAppointmentsData] = useLocalStorage('storage', {});
    const [filterData, setFilterData] = useLocalStorage('filter', {});

    const toggleModalFilterDate = () => {
        modalFilterDate ? setModalFilterDate(false) : setModalFilterDate(true);
    }
    const toggleModalFilterTime = () => {
        modalFilterTime ? setModalFilterTime(false) : setModalFilterTime(true);
    }

    const toggleAlertMessage = () => {
        if(!alertMessage) {
            setAlertMessage(true);
            const showAlert = setInterval(() => {
                setAlertMessage(false);
                clearInterval(showAlert);
            }, 3000);
        }
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
            checkData(data);
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

    const checkData = (data) => {
        if(data.appointment) {
            setAlertStatus({
                alert: 'success',
                message: 'Novo agendamento registrado!'
            });
        } else if(data.error === 'date_error') {
            setAlertStatus({
                alert: 'error',
                message: 'Não há mais agendamentos disponíveis neste dia'
            });
        } else if(data.error === 'time_error') {
            setAlertStatus({
                alert: 'error',
                message: 'Não há mais agendamentos disponíveis neste horário'
            });
        }
    }

    return {
        modalFilterDate,
        setModalFilterDate,
        modalFilterTime,
        setModalFilterTime,
        appointmentsData,
        setAppointmentsData,
        filterData,
        setFilterData,
        newAppointmentData,
        setNewAppointmentData,
        alertMessage,
        setAlertMessage,
        alertStatus,
        toggleModalFilterDate,
        toggleModalFilterTime,
        toggleAlertMessage,
        registerAppointment,
        loadAppointments,
        filterAppointments,
    }
}

export default useAppointmentProvider;