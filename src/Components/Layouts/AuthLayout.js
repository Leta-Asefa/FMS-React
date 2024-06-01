// MainLayout.js
import React from 'react';
import Navbar from '../Partials/NavBar';
import Footer from '../Partials/Footer';
import SideBar from '../Partials/SideBar';
import { Outlet } from 'react-router';

const AuthLayout = ({ children }) => {
  return (
    <>
       <Outlet/>
       
    </>
  );
};

export default AuthLayout;
