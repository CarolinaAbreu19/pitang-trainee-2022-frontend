import { useState } from "react";

const useAppointmentProvider = () => {
    const [modalFilterDate, setModalFilterDate] = useState(false);
    const [modalFilterTime, setModalFilterTime] = useState(false);

    const toggleModalFilterDate = () => {
        modalFilterDate ? setModalFilterDate(false) : setModalFilterDate(true);
    }
    const toggleModalFilterTime = () => {
        modalFilterTime ? setModalFilterTime(false) : setModalFilterTime(true);
    }

    return {
        modalFilterDate,
        setModalFilterDate,
        toggleModalFilterDate,
        modalFilterTime,
        setModalFilterTime,
        toggleModalFilterTime
    }
}

export default useAppointmentProvider;