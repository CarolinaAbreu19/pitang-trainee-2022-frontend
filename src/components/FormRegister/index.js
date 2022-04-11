import './styles.css';
import { useState } from 'react';
import { getDay, getMonth, getYear } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormRegister = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date(2022, 5, 11, 7));
    const [newAppointment, setNewAppointment] = useState({
        name: '',
        birth_date: '',
        day: '',
        time: ''
    });

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    }

    const handleChange = (event) => {
        setNewAppointment({
            ...newAppointment,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = () => {
        console.log(newAppointment);
        console.log(startDate, startTime)
    }

    return (
        <form action="" className='form__container' onSubmit={e => e.preventDefault()}>
            <div className="form__field">
                <label htmlFor="name" className='form__label'>Nome</label>
                <input type="text" id='name' name='name' className='form__input' onChange={e => handleChange(e)} />
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
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                    fixedHeight
                />
            </div>
            <div className="form__field">
                <label htmlFor="" className='form__label'>Dia do agendamento</label>
                <DatePicker
                    className='form__datepicker'
                    id='day'
                    name='day'
                    locale={pt}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    filterDate={isWeekday}
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                    fixedHeight 
                />
            </div>
            <div className="form__field">
                <label htmlFor="" className='form__label'>Horário do agendamento</label>
                <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    className='form__datepicker'
                    id='time'
                    name='time'
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Horário"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    minTime={(new Date(2022, 0, 1, 7))}
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