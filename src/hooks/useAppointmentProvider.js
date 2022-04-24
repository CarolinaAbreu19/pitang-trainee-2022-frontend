import axios from "axios";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import { getDate, getMonth, getYear } from 'date-fns';

const useAppointmentProvider = () => {
    const path = 'http://localhost:3333/appointment';
    
    const [modalFilterDate, setModalFilterDate] = useState(false);
    const [modalFilterTime, setModalFilterTime] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);
    
    const [alertStatus, setAlertStatus] = useState({});

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

    const notification = (type, message) => {
        setAlertStatus({
            alertType: type,
            message: message
        });
        toggleAlertMessage();
    }

    const registerAppointment = async (newAppointment) => {
        try {
            const response = await axios.post(path, newAppointment);
            const data = response.data;
            notification('success', 'Novo agendamento registrado!');
        } catch (error) {
            if(error.response.data.error === 'time_error') {
                notification('error', 'Não há mais agendamentos disponíveis neste horário');
            } else if(error.response.data.error === 'date_error') {
                notification('error', 'Não há mais agendamentos disponíveis para este dia');
            }            
        }
    }

    const loadAppointments = async () => {
        const response = await axios.get(path);
        const data = response.data;
        setAppointmentsData(data.appointments);
    }

    const filterAppointments = async (filter, value) => {
        const valueFormat = validateDate(value);
        try {
            const response = await axios.get(`${path}?filter=${filter}&value=${valueFormat}`);
            const data = response.data;
            setFilterData(data.appointments);
            setModalFilterDate(false);
            setModalFilterTime(false);
        } catch (error) {
            console.error(error);
        }
    }

    const makeAppointment = async (id) => {
        try {
            const response = await axios.patch(`${path}/${id}`);
            loadAppointments();
            notification('success', 'Atendimento realizado!');
        } catch (error) {
            console.error(error);
            notification('error', 'Ooops! Não foi possível atender este paciente');
        }
    }

    const deleteAppointment = async (id) => {
        try {
            const response = await axios.delete(`${path}/${id}`);
            loadAppointments();
            notification('success', 'O agendamento foi cancelado com sucesso');
        } catch (error) {
            console.error(error);
            notification('error', 'Ooops! Não foi possível cancelar este agendamento');
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
        modalFilterTime,
        appointmentsData,
        filterData,
        setFilterData,
        newAppointmentData,
        setNewAppointmentData,
        alertMessage,
        alertStatus,
        toggleModalFilterDate,
        toggleModalFilterTime,
        registerAppointment,
        loadAppointments,
        filterAppointments,
        makeAppointment,
        deleteAppointment,
        validateDate
    }
}

export default useAppointmentProvider;