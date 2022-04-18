import './styles.css';

const SearchBar = () => {
    return(
        <div className="searchbar__container">
            <input type="text" className='searchbar__input' placeholder='Pesquisar...' />
        </div>
    );
}

export default SearchBar;