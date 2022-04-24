import './styles.css';
import img_no_results from '../../../assets/img_no_results.svg';

const NoResults = () => {
    return (
        <div className="no-results__container">
            <figure className='no-results__image'>
                <img src={img_no_results} alt="A busca não retornou resultados" />
            </figure>
            <div className="no-results__message">
                <h1 className='no-results__title'>Nenhum resultado foi encontrado!</h1>
                <h2 className='no-results__subtitle'>Verifique se a escrita está correta e tente novamente</h2>
            </div>
        </div>
    );
}

export default NoResults;