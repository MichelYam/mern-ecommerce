import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import CheckOut from './pages/CheckOut';
import Error from './pages/Error';
import './App.css';
import Header from './components/Header';
import Product from './pages/Product';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Forgot from './pages/Forgot';
import ResetPassword from './pages/ResetPassword';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import Success from './pages/Success';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/userSlice';
import { RootState, useAppSelector } from './redux/store';

// require('dotenv').config()

function App() {

  return (
    <div className='container'>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route element={<ProtectedRoute />}>
        </Route> */}
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart/checkout" element={<CheckOut />} />
            <Route path="success" element={<Success />} />
            <Route path='/404' element={<Error />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
