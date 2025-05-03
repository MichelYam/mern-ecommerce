import React, { useEffect, useState } from 'react'
import "./style.css";

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { saveStorage } from '../../../utils/TokenStorage';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import { useLoginUserMutation } from '../../../redux/api/api';
import { useLoginMutation } from '../../../redux/api/userApi';
import { setUser } from '../../../redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { toast } from 'react-toastify';

const Index = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false
  })
  const [loginUser, { isLoading, isSuccess, isError, error }] = useLoginMutation()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {isAuthenticated} = useAppSelector((state) => state.user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.name === "remember" ? !data.remember : event.target.value,
    })
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(data)
    .then((response) => {
      if ('data' in response) {
          saveStorage(response.data.token, data.remember)
          dispatch(setUser(response.data as any))
          navigate('/');
        } else {
          // response is of type '{ error: FetchBaseQueryError | SerializedError; }'
          console.log(response.error);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("User Login Successfully")
  //     navigate(-1)
  //   }
  // }, [isSuccess])

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="container-login">
      <div className="form-container">
        <h2>Login</h2>
        {/* {error?.data.message} */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='email'
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name='password'
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox id='remember' name='remember' onChange={handleChange} />} label="Remember me" />
          </FormGroup>
          <button className='login-btn' type="submit">Login</button>
          <Link to={'/forgot'}>  Forgot Password ? </Link>
        </form>
        <hr />
        <Link to={"/register"} className='message-help'>You do not have an account ?</Link>

      </div>
    </div>
  );
};

export default Index