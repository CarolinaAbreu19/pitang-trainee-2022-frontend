import ModalContainer from '../../../utils/ModalContainer';
import pt from 'date-fns/locale/pt';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { getHours, getDay, getDate, getMonth, getYear, format } from 'date-fns';
import './styles.css';

const ModalSearchDate = () => {
    const [dateAppointment, setDateAppointment] = useState();

    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    }

    return (
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
                <button className='modal__button --no'>Cancelar</button>
                <button className='modal__button --yes'>Filtrar</button>
            </div>
        </ModalContainer>
    );
}

export default ModalSearchDate;