import './styles.css';
import icon_alert from '../../assets/icon_alert.svg';

const ModalDeleteAppointment = () => {
    return (
        <div className="modal__background">
            <div className="modal__container">
                <div className="modal__hide">
                    <button>X</button>
                </div>
                <div className="modal__alert">
                    <img src={icon_alert} alt="Alerta" />
                </div>
                <div className="modal__title">
                    <h1>Tem certeza que deseja excluir este agendamento?</h1>
                </div>
                <div className="modal__buttons">
                    <button className='modal__button --no'>Não</button>
                    <button className='modal__button --yes'>Sim</button>
                </div>
            </div>
            
        </div>
    );
}

export default ModalDeleteAppointment;