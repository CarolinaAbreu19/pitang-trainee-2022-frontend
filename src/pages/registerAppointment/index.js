import FormRegister from '../../components/FormRegister';
import './styles.css';

const RegisterAppointment = () => {
    return (
        <div className="register__page">
            <div className="page__description">
                <div className="page__title">Novo Agendamento</div>
                <div className="page__subtitle">Preencha o formulário para registrar o agendamento da sua vacina</div>
            </div>
            <div className="register__form">
                <FormRegister />
            </div>
        </div>
    );
}

export default RegisterAppointment;