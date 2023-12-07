import Navbar from './navbar/Navbar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homePage';
import LoginPage from '../pages/login/loginPage';
import RegisterPage from '../pages/register/registerPage';

const Layout:React.FC = () =>{
    return (
        <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    )
}

export default Layout;