import './App.css';
import Dashboard from './pages/dashboard';
import RegisterAppointment from './pages/registerAppointment';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Context from './contexts/Context';

function App() {
  return (
    <div className="App">
      <Context.Provider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/register' element={<RegisterAppointment />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
