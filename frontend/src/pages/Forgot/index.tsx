import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForgotPasswordMutation } from '../../service/api'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [forgotPassword, { data: message }] = useForgotPasswordMutation()
  const [email, setEmail] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    forgotPassword(email).then((response) => {
      toast.success("Please check your email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail("")
    })
      .catch((err) => {
        // Handle login error
        console.error("err", err);
        toast.error("Please check your email", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }
  return (
    <div className='reset-container'>
      <h2>Forgot Password</h2>
      <p>Tell us your email address and we will send you a link with instruction to reset your password.</p>
      <ToastContainer />
      {/* {message} */}
      <form onSubmit={handleSubmit}>
        <TextField id="email" label="Email" variant="outlined" value={email} onChange={handleChange} />
        <Button type='submit' variant="contained">Send Email</Button>
      </form>
      <span>
        Don't have an account ?
        <Link className='redirect-link' to={'/register'}>
          Sign up
        </Link>
      </span>

    </div>
  )
}

export default Index