import './App.css';
import Dashboard from './pages/dashboard';
import RegisterAppointment from './pages/registerAppointment';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppointmentProvider from './contexts/Context';


function App() {
  return (
    <div className="App">
      <AppointmentProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/register' element={<RegisterAppointment />} />
          </Routes>
        </BrowserRouter>
      </AppointmentProvider>
      
    </div>
  );
}

export default App;
