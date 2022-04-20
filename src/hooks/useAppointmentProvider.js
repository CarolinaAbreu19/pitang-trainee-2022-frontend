import { useState } from "react";
import { useLocalStorage } from "react-use";
import axios from "axios";

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
            const response = await axios.post("http://localhost:3333/appointment", newAppointment);
            const data = response.data;
            setAlertStatus({
                alert: 'success',
                message: 'Novo agendamento registrado!'
            });
        } catch (error) {
            console.error(error);
            setAlertStatus({
                alert: 'error',
                message: 'Não há mais agendamentos disponíveis neste horário'
            });
        }
    }

    const loadAppointments = async () => {
        const response = await axios.get('http://localhost:3333/appointment');
        const data = response.data;
        setAppointmentsData(data.appointments);
    }

    const filterAppointments = async (filter, value) => {
        try {
            const response = await axios.get(`http://localhost:3333/appointment?filter=${filter}&value=${value}`);
            const data = response.data;
            setFilterData(data.appointments);
            setModalFilterDate(false);
            setModalFilterTime(false);
        } catch (error) {
            console.error(error);
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