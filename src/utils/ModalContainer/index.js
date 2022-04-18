import './styles.css';

const ModalContainer = (props) => {
    return (
        <div className="modal__background">
            <div className="modal__container">
                <div className="modal__hide">
                    <button>X</button>
                </div>
                {props.children}
            </div>
        </div>
    );
}

export default ModalContainer;