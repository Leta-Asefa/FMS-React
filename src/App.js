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
import PathBar from './Components/Partials/PathBar';
import CreateNewFolder from './Components/PopUps/CreateNewFolder';
import AddUsers from './Components/AddUsers';
import UsersControl from './Components/UsersControl';
import ChangePassword from './Components/ChangePassword';

function App() {
  return (



    <Router>
      <Navbar />

      <div className='flex'>
        <div className='flex-none'><SideBar /></div>
        <div className='flex-grow bg-slate-200'>
          <MenuBar />
          <PathBar/>
          <div>
          <Routes>
              <Route path="/home/:id?" element={<Home />} />
              <Route path="/adduser" element={<AddUsers />} />
              <Route path="/alloweduser" element={<UsersControl />} />
              <Route path="/changepassword" element={<ChangePassword />} />
           </Routes>
          </div>
        </div>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
