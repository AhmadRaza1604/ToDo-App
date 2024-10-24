import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/loginSignup/Login';
import Signup from './components/loginSignup/Signup';
import Home from './components/home/home';

function App() {
  return (
    <div className="App">
          <BrowserRouter>
      {/* <ToastContainer /> */}
        <Routes>
          
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />



        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
