import './styles.css';

const ErrorMessage = (message) => {
    return (
        <>
            <label htmlFor="" className='error__message'>{message.message}</label>
        </>
    );
}

export default ErrorMessage;