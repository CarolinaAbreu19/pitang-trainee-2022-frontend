import './styles.css';

const ButtonGreen = (props) => {
    return (
        <button className='button__green' onClick={props.onClick}>{props.value}</button>
    );
}

export default ButtonGreen;