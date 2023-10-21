import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useResetPasswordMutation } from '../../service/api'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
    const [resetPassword] = useResetPasswordMutation()
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("")
    const navigate = useNavigate()

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };
    const handleChangePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPasswordConfirmation(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword === newPasswordConfirmation) {

            resetPassword(newPassword).then((response: any) => {
                console.log(response)
                // navigate("/login")
            })
                .catch((err: any) => {
                    // Handle login error
                    console.error("err", err);
                });
        } else {
            console.log("passwords do not match")
        }
    }
    return (
        <div className='reset-container'>
            <h2>Reset Password</h2>
            <ToastContainer />
            {/* {message} */}
            <form onSubmit={handleSubmit}>
                <TextField id="newPassword" label="New Password" variant="outlined" value={newPassword} onChange={handleChangePassword} />
                <TextField id="newPasswordConfirmation" label="Password Confirmation" variant="outlined" value={newPasswordConfirmation} onChange={handleChangePasswordConfirmation} />
                <Button type='submit' variant="contained">Save</Button>
            </form>
            <Link className='redirect-link' to={'/login'}>
                Back to login
            </Link>
        </div>
    )
}

export default Index