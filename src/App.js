import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Home from './Components/Home';
import AddUsers from './Components/AddUsers';
import UsersControl from './Components/UsersControl';
import ChangePassword from './Components/ChangePassword';
import AuthLayout from './Components/Layouts/AuthLayout';
import MainLayout from './Components/Layouts/MainLayout';
import Logout from './Components/Auth/Logout';

function App() {

  return (
    <Router>
      <Routes>
        {/* Routes that use MainLayout */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home/>} />
          <Route path="/home/:id" element={<Home />} />
          <Route path="/adduser" element={<AddUsers />} />
          <Route path="/alloweduser" element={<UsersControl />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>

        {/* Routes that use AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/logout' element={<Logout/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
