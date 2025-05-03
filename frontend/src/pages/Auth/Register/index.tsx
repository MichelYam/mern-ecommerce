import React, { useState } from 'react'
import "./style.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../redux/store';
import { useSignupMutation } from '../../../redux/api/userApi';



// regex handle email model
const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// regex for handle special characters
const regexName = /^[a-zA-Zéèà\s]+$/;

const Index = () => {
  const [signup, { isLoading, isSuccess, isError, error }] = useSignupMutation()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
    const navigate = useNavigate()
  const [errors, setError] = useState('');
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
      navigate('/login');
    } catch (err) {
      setError("Erreur lors de l'inscription");
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <div className="container-register">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {errors && <p>{errors}</p>}
          <input
            type="text"
            name='name'
            placeholder="First name & Last name"
            value={data.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name='email'
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
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