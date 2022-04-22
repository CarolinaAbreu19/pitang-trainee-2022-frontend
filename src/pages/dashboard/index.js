import './styles.css';
import FilterTable from '../../components/FilterTable';
import DashboardTable from '../../components/DashboardTable';
import ButtonBlue from '../../utils/ButtonBlue';
import ModalContainer from '../../utils/ModalContainer';
import useAppointmentProvider from '../../hooks/useAppointmentProvider';
import DatePicker from "react-datepicker";
import pt from 'date-fns/locale/pt';
import { getHours, getDay, format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {

    const { modalFilterDate, toggleModalFilterDate, modalFilterTime, toggleModalFilterTime, filterAppointments, filterData } = useAppointmentProvider();
    
    const [dateAppointment, setDateAppointment] = useState();
    const [timeAppointment, setTimeAppointment] = useState(new Date(2022, 5, 11, 8));
    
    const [isOpen, setIsOpen] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    }

    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const filterResults = async (filter, value) => {
        if(filter === 'time') {
            value = getHours(value).toString();
        }

        try {
            filterAppointments(filter, value);
            setIsFiltered(true);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="dashboard__container">
            <div className="dashboard__header">
                <div className="search__buttons">
                    <ButtonBlue value="Agrupar por data" onClick={() => toggleModalFilterDate()} />
                    <ButtonBlue value="Agrupar por horário" onClick={() => toggleModalFilterTime()} />
                </div>
                <div className="button__new-appointment">
                    <Link to="/register">
                        <ButtonBlue value="Novo Agendamento" />
                    </Link>
                </div>
            </div>
            <div className="dashboard__body">
                { isFiltered ? <FilterTable list={filterData} /> : <DashboardTable /> }
            </div>

            {modalFilterDate && 
            <ModalContainer>
                <div className="modal__title">
                    <h1>Informe a data que deseja filtrar sua pesquisa</h1>
                </div>
                <div className="modal__filter">
                    <DatePicker
                            className='form__datepicker'
                            id='date_appointment'
                            locale={pt}
                            dateFormat="dd/MM/yyyy"
                            filterDate={isWeekday}
                            selected={dateAppointment} 
                            onChange={e => setDateAppointment(e)}
                            fixedHeight 
                            strictParsing
                        />
                </div>
                <div className="modal__buttons">
                    <button className='modal__button --no' onClick={() => toggleModalFilterDate()}>Cancelar</button>
                    <button className='modal__button --yes' onClick={() => filterResults('date', dateAppointment)}>Filtrar</button>
                </div>
            </ModalContainer>}

            {modalFilterTime && 
                <ModalContainer>
                <div className="modal__title">
                    <h1>Informe o horário que deseja filtrar sua pesquisa</h1>
                </div>
                <div className="modal__filter">
                    <button className="form__button --time-appointment" id='time_appointment' onClick={handleClick}>
                        {format(timeAppointment, "HH:mm")}
                    </button>
                    {isOpen && (      
                        <DatePicker
                            selected={timeAppointment}
                            onChange={e => {setTimeAppointment(e); setIsOpen(!isOpen)}}
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
                <div className="modal__buttons">
                    <button className='modal__button --no' onClick={() => toggleModalFilterTime()}>Cancelar</button>
                    <button className='modal__button --yes' onClick={() => filterResults('time', timeAppointment)}>Filtrar</button>
                </div>
            </ModalContainer>}
        </div>
    );
}

export default Dashboard;