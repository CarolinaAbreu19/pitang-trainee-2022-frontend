import './styles.css';
import { useEffect, useState } from 'react';
import { getHours, getDay, getDate, getMonth, getYear, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from '../../utils/ErrorMessage';
import { Link } from "react-router-dom";
import ButtonGreen from '../../utils/ButtonGreen';
import ButtonRed from '../../utils/ButtonRed';
import useAppointmentProvider from '../../hooks/useAppointmentProvider';


const FormRegister = () => {
    const { newAppointmentData, setNewAppointmentData } = useAppointmentProvider();
    const [birthDate, setBirthDate] = useState();
    const [dateAppointment, setDateAppointment] = useState();
    const [timeAppointment, setTimeAppointment] = useState(new Date(2022, 5, 11, newAppointmentData.time_appointment || 8));
    const [newAppointment, setNewAppointment] = useState({
        name: newAppointmentData.name,
        birth_date: [ getDate(birthDate), (getMonth(birthDate)+1) , getYear(birthDate) ].join('/'),
        date_appointment: [ getDate(dateAppointment), (getMonth(dateAppointment)+1) , getYear(dateAppointment) ].join('/'),
        time_appointment: getHours(timeAppointment)
    });
    const [error, setError] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    }

    const handleChange = (event, name) => {
        if(name === 'name') {
            setNewAppointmentData({ ...newAppointmentData, name: event.target.value });
            setNewAppointment({
                ...newAppointment,
                name: event.target.value
            });
            return;
        }

        if(name === 'time_appointment') {
            setIsOpen(!isOpen);
            setNewAppointmentData({ ...newAppointmentData, time_appointment: getHours(event) });
            setNewAppointment({
                ...newAppointment,
                time_appointment: getHours(event)
            });
            return;
        }

        setNewAppointment({
            ...newAppointment,
            [name]: [ getDate(event), (getMonth(event)+1), getYear(event) ].join('/')
        });

        setNewAppointmentData({
            ...newAppointmentData,
            [name]: [ getDate(event), (getMonth(event)+1), getYear(event) ].join('/')
        });
    }

    const handleRegisterAppointment = async () => {
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
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = () => {
        setError({
            name: newAppointment.name.length === 0,
            birth_date: !birthDate,
            date_appointment: !dateAppointment,
        });
        handleRegisterAppointment();
    }

    return (
        <form action="" className='form__container' onSubmit={e => e.preventDefault()}>
            <div className="form__field">
                <label htmlFor="name" className='form__label --required'>Nome</label>
                <input type="text" id='name' className='form__input' onChange={e => handleChange(e, 'name')} value={newAppointmentData.name} />
                 { error.name && <ErrorMessage message="O campo nome é obrigatório" />}
            </div>
            <div className="form__field">
                <label htmlFor="birth__date" className='form__label --required'>Data de nascimento</label>
                <DatePicker
                    className='form__datepicker'
                    id='birth__date'
                    name='birth__date'
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    selected={birthDate} 
                    onChange={e => { 
                        setBirthDate(e); 
                        handleChange(e, 'birth_date');
                    }}
                    fixedHeight
                    strictParsing
                />
                { error.birth_date && <ErrorMessage message="O campo data de nascimento é obrigatório" /> }
            </div>
            <div className="form__field">
                <label htmlFor="date_appointment" className='form__label --required'>Dia do agendamento</label>
                <DatePicker
                    className='form__datepicker'
                    id='date_appointment'
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    filterDate={isWeekday}
                    selected={dateAppointment} 
                    onChange={e => { 
                        setDateAppointment(e);
                        handleChange(e, 'date_appointment');
                    }}
                    fixedHeight 
                    strictParsing
                />
                { error.date_appointment && <ErrorMessage message="O campo dia do agendamento é obrigatório" /> }
            </div>
            <div className="form__field">
                <label htmlFor="time_appointment" className='form__label'>Horário do agendamento</label>
                <button className="form__button --time-appointment" id='time_appointment' onClick={handleClick}>
                    {format(timeAppointment, "HH:mm")}
                </button>
                {isOpen && (      
                <DatePicker
                    selected={timeAppointment}
                    onChange={e => { setTimeAppointment(e); handleChange(e, 'time_appointment') }}
                    className='form__datepicker'
                    showTimeSelect
                    showTimeSelectOnly
                    strictParsing
                    inline
                    timeIntervals={60}
                    timeCaption="Horário"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    minTime={(new Date(2022, 0, 1, 8))}
                    maxTime={(new Date(2022, 0, 1, 17))}
                />  
                )}
            </div>
            <div className="button__field">
                <ButtonGreen className='form__button --confirm' type='submit' onClick={() => handleSubmit()} value="Agendar" />
                <Link to="/">
                    <ButtonRed value="Cancelar" />
                </Link>
            </div>
        </form>
    );
}

export default FormRegister;