import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Partials/NavBar';
import Footer from './Components/Partials/Footer';
import SideBar from './Components/Partials/SideBar';
import MenuBar from './Components/Partials/MenuBar';
import Signup from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import FolderList from './Components/FolderList';
import Home from './Components/Home';

function App() {
  return (



    <Router>
       <Navbar />

      <div className='flex'>
        <div className='flex-none'><SideBar /></div>
        <div className='flex-grow bg-slate-200'>
          <MenuBar />
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </div>

      <Footer />

    </Router>
  );
}

export default App;
