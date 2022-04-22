import { useState } from "react";
import { useLocalStorage } from "react-use";
import axios from "axios";
import { getDate, getMonth, getYear, parseISO, set } from 'date-fns';

const useAppointmentProvider = () => {
    const [modalFilterDate, setModalFilterDate] = useState(false);
    const [modalFilterTime, setModalFilterTime] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    const [alertStatus, setAlertStatus] = useState({
        alertType: '',
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
                alertType: 'success',
                message: 'Novo agendamento registrado!'
            });
            toggleAlertMessage();
        } catch (error) {
            if(error.response.data.error === 'time_error') {
                setAlertStatus({
                    alertType: 'error',
                    message: 'Não há mais agendamentos disponíveis neste horário'
                });
                toggleAlertMessage();
            } else if(error.response.data.error === 'date_error') {
                setAlertStatus({
                    alertType: 'error',
                    message: 'Não há mais agendamentos disponíveis para este dia'
                });
                toggleAlertMessage();
            }            
        }
    }

    const loadAppointments = async () => {
        const response = await axios.get('http://localhost:3333/appointment');
        const data = response.data;
        setAppointmentsData(data.appointments);
    }

    const filterAppointments = async (filter, value) => {
        const valueFormat = validateDate(value);
        try {
            const response = await axios.get(`http://localhost:3333/appointment?filter=${filter}&value=${valueFormat}`);
            const data = response.data;
            setFilterData(data.appointments);
            setModalFilterDate(false);
            setModalFilterTime(false);
        } catch (error) {
            console.error(error);
        }
    }

    const validateDate = (dateValue) => {
        const newDate = [];

        if(typeof(dateValue) === 'string') {
            return dateValue;
        }

        getDate(dateValue).toString().length === 1 ? newDate.push(`0${getDate(dateValue)}`) : newDate.push(getDate(dateValue).toString());
        getMonth(dateValue).toString().length === 1 ? newDate.push(`0${getMonth(dateValue)+1}`) : newDate.push((getMonth(dateValue)+1).toString());
        newDate.push(getYear(dateValue).toString());
        return newDate.join('/');
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
        validateDate
    }
}

export default useAppointmentProvider;