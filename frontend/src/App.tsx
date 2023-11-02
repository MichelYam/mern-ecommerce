import React from 'react';
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
import { setToken } from './utils/TokenStorage';
import Profile from './pages/Profile';
import Forgot from './pages/Forgot';
import ResetPassword from './pages/ResetPassword';
import Cart from './pages/Cart';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch } from './redux/store';
import { setUser } from './redux/features/userSlice';


function App() {
  // Authentication
  // const dispatch = useAppDispatch()
  // const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  // if (token) {
  //   dispatch(setUser(token))
  // }
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
            <Route path="/account" element={<Profile />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/checkout" element={<CheckOut />} />
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
