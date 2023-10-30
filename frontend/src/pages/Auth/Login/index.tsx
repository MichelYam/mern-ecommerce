import React, { useState } from 'react'
import "./style.css";
import { useLoginUserMutation } from '../../../service/api';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { saveStorage } from '../../../utils/TokenStorage';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loginUser, { isLoading, isSuccess, isError, error }] = useLoginUserMutation()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // if (userToken) return <Navigate to="/dashboard" />;

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(!remember);
  }
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ email, password })
      .then((response) => {
        // console.log("response", response);
        if ('data' in response) {
          navigate("/")
          saveStorage(response.data.token, remember)
        } else {
          // response is of type '{ error: FetchBaseQueryError | SerializedError; }'
          console.log(response.error);
        }
      })
      .catch((err) => {
        console.error("err", err);
      });

  };

  if (localStorage.getItem("token")) return <Navigate to="/" />;
  return (
    <div className="container-login">
      <div className="form-container">
        <h2>Login</h2>
        {/* {error?.data.message} */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox id='remember' name='remember' onChange={handleRememberChange} />} label="Remember me" />
          </FormGroup>
          <button className='login-btn' type="submit">Login</button>
          <Link to={'/forgot'}>  Forgot Password? </Link>
        </form>
        <hr />
        <Link to={"/register"} className='message-help'>Vous n'avez pas de compte ? cliquez ici</Link>

      </div>
    </div>
  );
};

export default Index