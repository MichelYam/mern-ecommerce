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


// Authentication
const token = localStorage.getItem('token');

if (token) {
  // authenticate api authorization
  setToken(token);

  // authenticate routes
  // store.dispatch({ type: SET_AUTH });
}
function App() {
  return (
    <div className='container'>
      <BrowserRouter>
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
