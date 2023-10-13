import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Travelers from './components/Travelers';
import Trains from './components/Trains';
import TravelAgents from './components/TravelAgents';
import Reservations from './components/Reservations';
import Schedules from './components/Schedules';
import CreateReservations from './components/CreateReservations';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/travelers" element={<Travelers />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/travel-agents" element={<TravelAgents />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/create-reservation" element={<CreateReservations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
