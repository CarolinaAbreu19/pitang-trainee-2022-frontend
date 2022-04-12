import './styles.css';
import { useState } from 'react';
import { getHours, getDay, getDate, getMonth, getYear } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormRegister = () => {
    const [birthDate, setBirthDate] = useState(new Date());
    const [dateAppointment, setDateAppointment] = useState(new Date());
    const [timeAppointment, setTimeAppointment] = useState(new Date(2022, 5, 11, 8));
    const [newAppointment, setNewAppointment] = useState({
        name: '',
        birth_date: [ getDate(birthDate), (getMonth(birthDate)+1) , getYear(birthDate) ].join('/'),
        date_appointment: [ getDate(dateAppointment), (getMonth(dateAppointment)+1) , getYear(dateAppointment) ].join('/'),
        time_appointment: getHours(timeAppointment)
    });

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    }

    const handleChange = (event, name) => {
        if(name === 'name') {
            setNewAppointment({
                ...newAppointment,
                name: event.target.value
            });
            return;
        }

        if(name === 'time_appointment') {
            setNewAppointment({
                ...newAppointment,
                time_appointment: getHours(event)
            });
            return;
        }

        setNewAppointment({
            ...newAppointment,
            [name]: [ getDate(event), (getMonth(event)+1), getYear(event) ].join('/')
        })
    }

    const handleSubmit = () => {
        
        console.log(newAppointment);
    }

    return (
        <form action="" className='form__container' onSubmit={e => e.preventDefault()}>
            <div className="form__field">
                <label htmlFor="name" className='form__label'>Nome</label>
                <input type="text" id='name' className='form__input' onChange={e => handleChange(e, 'name')} />
            </div>
            <div className="form__field">
                <label htmlFor="birth__date" className='form__label'>Data de nascimento</label>
                <DatePicker
                    className='form__datepicker'
                    id='birth__date'
                    name='birth__date'
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    selected={birthDate} 
                    onChange={e => { setBirthDate(e); handleChange(e, 'birth_date') }}
                    fixedHeight
                />
            </div>
            <div className="form__field">
                <label htmlFor="date_appointment" className='form__label'>Dia do agendamento</label>
                <DatePicker
                    className='form__datepicker'
                    id='date_appointment'
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    filterDate={isWeekday}
                    selected={dateAppointment} 
                    onChange={e => { setDateAppointment(e); handleChange(e, 'date_appointment') }}
                    fixedHeight 
                />
            </div>
            <div className="form__field">
                <label htmlFor="time_appointment" className='form__label'>Horário do agendamento</label>
                <DatePicker
                    selected={timeAppointment}
                    onChange={e => { setTimeAppointment(e); handleChange(e, 'time_appointment') }}
                    className='form__datepicker'
                    id='time_appointment'
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Horário"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    minTime={(new Date(2022, 0, 1, 8))}
                    maxTime={(new Date(2022, 0, 1, 17))}
                />
            </div>
            <div className="button__field">
                <button className='form__button --confirm' type='submit' onClick={() => handleSubmit()}>Agendar</button>
                <button className='form__button --cancel'>Cancelar</button>
            </div>
        </form>
    );
}

export default FormRegister;