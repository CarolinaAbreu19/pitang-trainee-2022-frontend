import './styles.css';
import { Link } from "react-router-dom";

const ButtonNewAppointment = () => {
    return (
        <div className="new-appointment-button__container">
            <button className='button__new-appointment'>
                <Link to="/register">Novo agendamento</Link>
            </button>
        </div>
    );
}

export default ButtonNewAppointment;