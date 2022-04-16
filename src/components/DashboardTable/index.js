import './styles.css';
import TableBody from './TableBody';
import TableHead from './TableHead';

const DashboardTable = () => {
    return (
        <div className="table__container">
            <div className="new-appointment-button__container">
                <button className='button__new-appointment'>Novo agendamento</button>
            </div>
            <TableHead />
            <TableBody />
        </div>
    );
}

export default DashboardTable;