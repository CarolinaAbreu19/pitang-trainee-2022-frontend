import './styles.css';
import TableBody from './TableBody';
import TableHead from './TableHead';

const DashboardTable = () => {
    return (
        <div className="table__container">
            <TableHead />
            <TableBody />
        </div>
    );
}

export default DashboardTable;