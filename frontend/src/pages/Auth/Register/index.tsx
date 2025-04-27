import React, { useState } from 'react'
import "./style.css";
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store';

const Index = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
    console.log("Register form submitted");
  };

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <div className="container-register">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={handleChange}
            required
          />
          <button className='register-btn' type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Index