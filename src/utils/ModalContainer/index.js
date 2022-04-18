import './styles.css';

const ModalContainer = (props) => {
    return (
        <div className="modal__background">
            <div className="modal__container">
                {props.children}
            </div>
        </div>
    );
}

export default ModalContainer;