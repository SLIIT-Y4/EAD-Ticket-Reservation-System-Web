import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <UserContext.Provider value={{ userData, setUserData }}> */}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
        </Routes>
        {/* </UserContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
