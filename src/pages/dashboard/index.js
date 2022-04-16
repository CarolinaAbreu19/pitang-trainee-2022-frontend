import DashboardTable from '../../components/DashboardTable';
import './styles.css';
import ButtonNewAppointment from '../../components/ButtonNewAppointment';
import DashboardSearchBar from '../../components/DashboardSearchBar';

const Dashboard = () => {    
    return (
        <div className="dashboard__container">
            <div className="dashboard__header">
                <DashboardSearchBar />
                <ButtonNewAppointment />
            </div>
            <div className="dashboard__body">
                <DashboardTable />
            </div>
        </div>
    );
}

export default Dashboard;