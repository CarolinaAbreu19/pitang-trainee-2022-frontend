import './styles.css';

const ButtonBlue = (props) => {
    return (
        <button className='button__blue' onClick={props.onClick}>{props.value}</button>
    );
}

export default ButtonBlue;