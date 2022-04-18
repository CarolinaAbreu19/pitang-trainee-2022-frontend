import './styles.css';

const ButtonRed = (props) => {
    return (
        <button className='button__red'>{props.innerText}</button>
    );
}

export default ButtonRed;