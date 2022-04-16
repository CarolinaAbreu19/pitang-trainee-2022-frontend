import './styles.css';

const DashboardSearchBar = () => {
    return(
        <div className="searchbar__container">
            <input type="text" className='searchbar__input' placeholder='Pesquisar...' />
            <section className='searchbar__options'>
                <input type="radio" name="teste" className='input__radio' checked />
                <input type="radio" name="teste2" className='input__radio' />
            </section>
        </div>
    );
}

export default DashboardSearchBar;