import './styles.css';
import { useState } from 'react';
import { getHours, getDay, getDate, getMonth, getYear, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from '../../utils/ErrorMessage';
import { Link } from "react-router-dom";
import ButtonRed from '../../utils/ButtonRed';
import ButtonBlue from '../../utils/ButtonBlue';
import useAppointmentProvider from '../../hooks/useAppointmentProvider';
import AlertMessage from '../../utils/AlertMessage';
import { useFormik, Formik, useFormikContext, useField } from 'formik';


const FormRegister = () => {
    const { newAppointmentData, setNewAppointmentData, alertMessage, toggleAlertMessage, registerAppointment, alertStatus } = useAppointmentProvider();

    const [birthDate, setBirthDate] = useState();
    const [dateAppointment, setDateAppointment] = useState();
    const [timeAppointment, setTimeAppointment] = useState(new Date(2022, 5, 11, newAppointmentData.time_appointment || 8));

    const [error, setError] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    
    const [newAppointment, setNewAppointment] = useState({
        name: newAppointmentData.name || '',
        birth_date: [ getDate(birthDate), (getMonth(birthDate)+1) , getYear(birthDate) ].join('/'),
        date_appointment: [ getDate(dateAppointment), (getMonth(dateAppointment)+1) , getYear(dateAppointment) ].join('/'),
        time_appointment: getHours(timeAppointment)
    });
    
    const formik = useFormik({
        initialValues: {
            name: newAppointment.name || '',
            birth_date: '',
            date_appointment: '',
            time_appointment: new Date(2022, 5, 11, newAppointmentData.time_appointment || 8)
        },
        onSubmit: values => {

            // [ getDate(parseISO(formik.values.birth_date)), (getMonth(parseISO(formik.values.birth_date))+1) , getYear(parseISO(formik.values.birth_date)) ].join('/')
            
            const body = {
                name: newAppointmentData.name || formik.values.name,
                birth_date: parseISO(formik.values.birth_date),
                date_appointment: parseISO(formik.values.date_appointment),
                time_appointment: getHours(formik.values.time_appointment)
            }

            console.log(body);

            setError({
                name: !formik.values.name,
                birth_date: !formik.values.birth_date,
                date_appointment: !formik.values.date_appointment,
            });

            if(body.name && body.birth_date && body.date_appointment && body.time_appointment) {
                registerAppointment(body);
            }
            
            if(alertStatus.alert && alertStatus.message) {
                toggleAlertMessage();
            }
        }
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

    return (
        <div>
            <Formik
                initialValues={{
                    name: newAppointment.name || '',
                    birth_date: '',
                    date_appointment: '',
                    time_appointment: new Date(2022, 5, 11, newAppointmentData.time_appointment || 8)
                }}

                onSubmit={values => {
                    console.log(values)
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
                            <input type="text" id='name' className='form__input' onChange={formik.handleChange} value={formik.values.name} />
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
                                {format(timeAppointment, "HH:mm")}
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
                        {alertMessage && <AlertMessage alert={alertStatus.alert} message={alertStatus.message} />}
                    </form>
            
                )}}
            </Formik>
        </div>
    );
}

export default FormRegister;