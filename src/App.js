import './App.css';
import logo from './assets/logo.png';
import Dashboard from './pages/dashboard';
import RegisterAppointment from './pages/registerAppointment';
import AppointmentProvider from './contexts/Context';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className='header'>
          <Link to='/'>
            <img src={logo} alt="Logo Agenda Vacina" className='header__logo'/>
          </Link>
        </header>
        <AppointmentProvider>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/register' element={<RegisterAppointment />} />
          </Routes>
        </AppointmentProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
