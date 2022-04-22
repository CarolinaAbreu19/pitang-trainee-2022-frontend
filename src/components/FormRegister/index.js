import './styles.css';
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt';
import DatePicker from "react-datepicker";
import ErrorMessage from '../../utils/ErrorMessage';
import ButtonRed from '../../utils/ButtonRed';
import ButtonBlue from '../../utils/ButtonBlue';
import AlertMessage from '../../utils/AlertMessage';
import useAppointmentProvider from '../../hooks/useAppointmentProvider';
import { Link } from "react-router-dom";
import { useState } from 'react'; 
import { getHours, getDay, format } from 'date-fns';
import { Formik, useFormikContext, useField } from 'formik';


const FormRegister = () => {
    const { newAppointmentData, setNewAppointmentData, alertMessage, registerAppointment, alertStatus, validateDate } = useAppointmentProvider();
    const [isOpen, setIsOpen] = useState(false);

    const [error, setError] = useState({
        name: false,
        birth_date: false,
        date_appointment: false
    });

    const [localField, setLocalField] = useState({
        name: '',
        date_appointment: '',
        time_appointment: new Date(2022, 5, 11, newAppointmentData.time_appointment || 8)
    });

    const DatePickerField = ({ ...props }) => {
        const { setFieldValue } = useFormikContext();
        const [field] = useField(props);
        return (
          <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={(val) => {
              setFieldValue(field.name, val);

              // Can't do this to birth_date and date_appointment
              if(field.name === 'birth_date') {
                  setNewAppointmentData({ ...newAppointmentData, birth_date: new Date(val) });
              }

              if(field.name === 'date_appointment') {
                  setLocalField({ ...localField, date_appointment: new Date(val) });
              }
              
              if(field.name === 'time_appointment') {
                  setNewAppointmentData({ ...newAppointmentData, time_appointment: getHours(val) });
                  setLocalField({ ...localField, time_appointment: val });
                  setIsOpen(!isOpen);
              }

            }}
          />
        );
    };

    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    }

    return (
        <div>
            <Formik
                initialValues={{
                    name: newAppointmentData.name || localField.name,
                    birth_date: newAppointmentData.birth_date ? (newAppointmentData.birth_date).split('T')[0].split('-').reverse().join('/') : '',
                    date_appointment: '',
                    time_appointment: new Date(2022, 5, 11, newAppointmentData.time_appointment || 8)
                }}

                onSubmit={values => {
                    setError({
                        name: !newAppointmentData.name,
                        birth_date: !values.birth_date,
                        date_appointment: !values.date_appointment
                    });
                    
                    const body = {
                        name: newAppointmentData.name,
                        birth_date: validateDate(values.birth_date),
                        date_appointment: validateDate(localField.date_appointment),
                        time_appointment: getHours(values.time_appointment)
                    }

                    if(body.name && body.birth_date && body.date_appointment) {
                        registerAppointment(body);
                    }
                }}
            >

            {(props) => {
                const { handleSubmit } = props;
                return (
                    <form action="" className='form__container' onSubmit={handleSubmit}>
                        
                        <div className="button__field .--back">
                            <Link to="/">
                                <ButtonBlue value="Voltar" />
                            </Link>
                        </div>
                        <div className="form__field">
                            <label htmlFor="name" className='form__label --required'>Nome</label>
                            <input type="text" id='name' className='form__input' onChange={e => {setLocalField({ ...localField, name: e.target.value}); setNewAppointmentData({ ...newAppointmentData, name: e.target.value })}} value={newAppointmentData.name || localField.name} />
                            { error.name && <ErrorMessage message="O campo nome é obrigatório" />}
                        </div>
                        <div className="form__field">
                            <label htmlFor="birth__date" className='form__label --required'>Data de nascimento</label>                            
                            <DatePickerField
                                id="birth__date"
                                name="birth_date"
                                className="form__datepicker"
                                locale={pt}
                                dateFormat="dd/MM/yyyy"
                                maxDate={new Date()}
                                fixedHeight
                                strictParsing
                            />
                            { error.birth_date && <ErrorMessage message="O campo data de nascimento é obrigatório" /> }
                        </div>
                        <div className="form__field">
                            <label htmlFor="date_appointment" className='form__label --required'>Dia do agendamento</label>
                            <DatePickerField
                                id='date_appointment'
                                name="date_appointment"
                                className='form__datepicker'
                                locale={pt}
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                filterDate={isWeekday}
                                fixedHeight 
                                strictParsing
                            />
                            { error.date_appointment && <ErrorMessage message="O campo dia do agendamento é obrigatório" /> }
                        </div>
                        <div className="form__field">
                            <label htmlFor="time_appointment" className='form__label'>Horário do agendamento</label>
                            <button className="form__button --time-appointment" id='time_appointment' onClick={handleClick}>
                                {format(localField.time_appointment, "HH:mm")}
                            </button>
                            {isOpen && (      
                            <DatePickerField
                                id='time_appointment'
                                name='time_appointment'
                                className='form__datepicker'
                                timeIntervals={60}
                                timeCaption="Horário"
                                timeFormat="HH:mm"
                                dateFormat="HH:mm"
                                minTime={(new Date(2022, 0, 1, 8))}
                                maxTime={(new Date(2022, 0, 1, 17))}
                                showTimeSelect
                                showTimeSelectOnly
                                strictParsing
                                inline
                            />  
                            )}
                        </div>
                        <div className="button__field">
                            <button className='form__button  --submit' type="submit">Agendar</button>
                            <Link to="/">
                                <ButtonRed value="Cancelar" />
                            </Link>
                        </div>
                        {alertMessage && <AlertMessage alertType={alertStatus.alertType} message={alertStatus.message} />}
                    </form>
            
                )}}
            </Formik>
        </div>
    );
}

export default FormRegister;