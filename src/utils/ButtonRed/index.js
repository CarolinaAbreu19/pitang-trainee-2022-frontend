import './styles.css';

const ButtonRed = (props) => {
    return (
        <button className='button__red' onClick={props.onClick}>{props.value}</button>
    );
}

export default ButtonRed;