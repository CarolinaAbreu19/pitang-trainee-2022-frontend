import './App.css';
import Dashboard from './pages/dashboard';
import RegisterAppointment from './pages/registerAppointment';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/register' element={<RegisterAppointment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
