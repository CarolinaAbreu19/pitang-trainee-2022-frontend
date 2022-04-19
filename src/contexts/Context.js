import { createContext } from "react";
import useAppointmentProvider from "../hooks/useAppointmentProvider";

const Context = createContext({});

const AppointmentProvider = (props) => {
    const appointmentProvider = useAppointmentProvider();

    return (
        <Context.Provider value={appointmentProvider}>
            {props.children}
        </Context.Provider>
    );
}

export default AppointmentProvider;