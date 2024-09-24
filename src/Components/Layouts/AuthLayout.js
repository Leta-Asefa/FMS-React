// MainLayout.js
import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = ({ children }) => {
  return (
    <>
       <Outlet/>
       
    </>
  );
};

export default AuthLayout;
