// MainLayout.js
import React from 'react';
import Navbar from '../Partials/NavBar';
import Footer from '../Partials/Footer';
import SideBar from '../Partials/SideBar';
import { Outlet } from 'react-router';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <div className='flex-none'><SideBar /></div>
        <div className='flex-grow bg-slate-200'>
          <Outlet/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
