import './styles.css';
import TableBody from './TableBody';
import TableHead from './TableHead';

const FilterTable = (props) => {
    return (
        <div className="table__container">
            <TableHead />
            <TableBody list={props.list} />
        </div>
    );
}

export default FilterTable;