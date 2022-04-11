import { useEffect } from 'react';
import FormRegister from '../../components/FormRegister';
import './styles.css';

const RegisterAppointment = () => {

    async function handleRegisterUser() {
        const body = {
            name: "teste",
            birth_date: "12/02/1984",
            day: "13/04/2022",
            time: "12:00:00"
        }
        try {
            const response = await fetch("http://localhost:3333/appointment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="register__page">
            <FormRegister />
        </div>
    );
}

export default RegisterAppointment;