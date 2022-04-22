import './styles.css';
import success from '../../assets/icon_alert_success.svg';
import error from '../../assets/icon_alert_error.svg';

const AlertMessage = (props) => {
    return (
        <div className={`alert__container ${props.alertType === 'success' ? '--success' : '--error'}`}>
            <div className='alert__message'>
                <img src={props.alertType === 'success' ? success : error} alt="Alerta" />
                <span>{props.message}</span>
            </div>
        </div>
    );
}

export default AlertMessage;