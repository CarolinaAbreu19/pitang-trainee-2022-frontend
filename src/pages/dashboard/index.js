import DashboardTable from '../../components/DashboardTable';
import { Link } from "react-router-dom";
import './styles.css';

const Dashboard = () => {    
    return (
        <div className="dashboard__container">
            <div className="new-appointment-button__container">
                <button className='button__new-appointment'>
                    <Link to="/register">Novo agendamento</Link>
                </button>
            </div>
            <DashboardTable />
        </div>
    );
}

export default Dashboard;