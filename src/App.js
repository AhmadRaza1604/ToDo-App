import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/home/home';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/sidebar/Navbar';
import Help from './components/help/Help';
import VitalTask from './components/vital-task/VitalTask';
import MyTask from './components/mytask/MyTask';
import { useEffect, useState } from 'react';
import Verify from './components/auth/Verify';
import RequestReset from './components/auth/RequestReset';
import ResetPass from './components/auth/ResetPass';
import Account from './components/profile/Account';
import ChangePass from './components/profile/ChangePass';
import AddTask from './components/task/AddTask';
import SearchResults from './components/SearchResults';


function App() {
  const [isMob, setIsMob] = useState(false);

  const toggler =()=>{
    if(isMob){
    setIsMob(false);
  }
    else{
      setIsMob(true);
    }
  }
  useEffect(()=>{
    const mediaQuery=window.matchMedia('(max-width:768px)');
    const handleResize =()=>{
      
      if(mediaQuery.matches){
        setIsMob(true);
      } 
      else{
        setIsMob(false)
      }
    };

    window.addEventListener('resize', handleResize);
    return()=>{
      window.removeEventListener('resize',handleResize);
    };
  },[])
  const MainLayout = ({ children }) => (
    <div className="flex">
      <Sidebar isMob={isMob} setIsMob={setIsMob}/>
      <div className={`flex-grow ${isMob? 'ml-14': 'ml-64'}`}>
        <Navbar toggler={toggler}/>
        <div className="p-8 mt-16">
          {children}
        </div>
      </div>
    </div>
  );
  return (
    <div className="App">
          <BrowserRouter>
      <ToastContainer />
        <Routes>
          
          <Route path="/" element={<Home/>} />
          {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/reset-request" element={<RequestReset/>} />
          <Route path="/reset-Pass" element={<ResetPass/>} />
          <Route path="/add-task" element={<AddTask/>} />

          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/vital-task" element={<MainLayout><VitalTask /></MainLayout>} />
          <Route path="/search-result" element={<MainLayout><SearchResults /></MainLayout>} />
          <Route path="/account-details" element={<MainLayout><Account /></MainLayout>} />
          <Route path="/change-password" element={<MainLayout><ChangePass /></MainLayout>} />
          <Route path="/my-task" element={<MainLayout><MyTask /></MainLayout>} />
          <Route path="/help" element={<MainLayout><Help /></MainLayout>} />


        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
