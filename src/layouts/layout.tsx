import Navbar from './navbar/Navbar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/login/loginPage';
import RegisterPage from '../pages/register/registerPage';
import AccountInfoPage from '../pages/account/AccountPage';
import MyDevicePage from '../pages/device/MyDevicePage';
const Layout: React.FC = () => {
  return (

    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountInfoPage />} />
          <Route path="/device" element={<MyDevicePage/>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes></Router>
    </>

  )
}

export default Layout;