import './styles.css';

const ErrorMessage = (props) => {
    return (
        <>
            <label htmlFor="" className='error__message'>{props.message}</label>
        </>
    );
}

export default ErrorMessage;