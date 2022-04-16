import DashboardTable from '../../components/DashboardTable';
import './styles.css';
import ButtonNewAppointment from '../../components/ButtonNewAppointment';

const Dashboard = () => {    
    return (
        <div className="dashboard__container">
            <div className="dashboard__header">
                <ButtonNewAppointment />
            </div>
            <div className="dashboard__body">
                <DashboardTable />
            </div>
        </div>
    );
}

export default Dashboard;