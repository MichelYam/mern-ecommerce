import React, { useEffect, useRef, useState } from 'react'

import Button from '@mui/material/Button'

import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';

import moment from 'moment';
import { FiEdit } from 'react-icons/fi'
import { useGetUserQuery, useUpdateUserMutation } from '../../redux/api/api';


const Index = () => {
    const { data: user, isLoading, isSuccess, isError, error } = useGetUserQuery("")
    const [updateUser] = useUpdateUserMutation()
    const [edit, setEdit] = useState(false)
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        role: "",
        city: "",
        phone: "",
        country: "",
        zipCode: "",
    })

    useEffect(() => {
        if (user) {
            setUserData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                avatar: user.avatar || "",
                role: user.role,
                city: user.city || "",
                phone: user.phone || "",
                country: user.country || "",
                zipCode: user.zipCode || "",
            });
        }
    }, [user]);
    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLInputElement;
        setUserData({
            ...userData,
            [event.target.id]: event.target.id === "avatar" ? target.files![0] : event.target.value,
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateUser(userData)
        setEdit(false)
    }
    // console.log("user", data)
    return (
        <div className='profile'>
            {edit ? <>
                <div className='flex space-between align-items-center'>
                    <h2>Mon Profile</h2>
                    <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEdit(!edit)}>
                        Annuler
                    </Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='profile-avatar'>
                        <div className='block align-items-center'>
                            {/* <Avatar sx={{ bgcolor: deepOrange[500], height: '70px', width: '70px' }}> */}
                            <input type="file" id='avatar' name='avatar' accept='.jpeg, .png, .jpg' onChange={handleChangeValue} />
                            {/* </Avatar> */}
                        </div>
                    </div>
                    <div className='profile-info'>
                        <div className='block flex-direction-column'>
                            <div className='flex space-between align-items-center'>
                                <h3>Personal informations</h3>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="lastName" label="Last Name" variant="outlined" value={userData.lastName} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="firstName" label="First Name" variant="outlined" value={userData.firstName} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="email" label="Email" variant="outlined" value={userData.email} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="phone" label="Phone" variant="outlined" value={userData.phone} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                            {/* <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="dateOfBirth" label="Date de naissance" variant="outlined" type='date' value={userData.dateOfBirth} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='profile-controle'>
                                <FormControl>
                                    <TextField id="bio" label="Bio" variant="outlined" multiline onChange={handleChangeValue} value={userData.bio} />
                                </FormControl>
                            </div> */}
                        </div>
                    </div>
                    <div className='profile-address'>
                        <div className='block flex-direction-column'>
                            <div className='flex space-between align-items-center'>
                                <h3>Adresse</h3>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="country" label="Country" variant="outlined" value={userData.country} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="city" label="City" variant="outlined" value={userData.city} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <FormControl>
                                        <TextField id="zipCode" label="Zip Code" variant="outlined" value={userData.zipCode} onChange={handleChangeValue} />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex space-between'>
                        <Button variant="outlined" color="error" onClick={() => setEdit(!edit)}>
                            Cancel
                        </Button>
                        <Button variant="contained" type='submit'>
                            Save
                        </Button>
                    </div>
                </form>
            </> :
                <>
                    <div className='flex space-between align-items-center'>
                        <h2>Mon Profile</h2>
                        <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEdit(!edit)}>
                            Edit
                            <FiEdit style={{ fontSize: "20px", marginLeft: "5px" }} />
                        </Button>
                    </div>
                    <div className='profile-avatar'>
                        <div className='block align-items-center'>
                            <div className='flex align-items-center'>
                                {
                                    userData.avatar === "" ?
                                        <Avatar sx={{ bgcolor: deepOrange[500], height: '70px', width: '70px' }} />
                                        :
                                        <Avatar src={`../assets/uploads/${userData?.avatar}`} sx={{ height: '70px', width: '70px' }} />
                                }
                                <div className='flex flex-direction-column'>
                                    <p>{[userData?.firstName, userData?.lastName].join(" ")}</p>
                                    <p>{userData?.role}</p>
                                    <p>Paris, France</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='profile-info'>
                        <div className='block flex-direction-column'>
                            <div className='flex space-between align-items-center'>
                                <h3>Personal informations</h3>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <p>Last Name</p>
                                    <p>{userData?.lastName}</p>
                                </div>
                                <div className='profile-controle width-half'>
                                    <p>First Name</p>
                                    <p>{userData?.firstName}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <p>Email</p>
                                    <p>{userData?.email}</p>
                                </div>
                                <div className='profile-controle width-half'>
                                    <p>Phone</p>
                                    <p>{userData.phone}</p>
                                </div>
                            </div>
                            {/* <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <p>Date de naissance</p>
                                    <p>{moment(userData?.dateOfBirth).format('DD/MM/YYYY')}</p>
                                </div>
                            </div> */}
                            {/* <div className='profile-controle'>
                                <p>Bio</p>
                                <p>{userData.bio}</p>
                            </div> */}
                        </div>
                    </div>
                    <div className='profile-address'>
                        <div className='block flex-direction-column'>
                            <div className='flex space-between align-items-center'>
                                <h3>Address</h3>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <p>Country</p>
                                    <p>{userData?.country}</p>
                                </div>
                                <div className='profile-controle width-half'>
                                    <p>City</p>
                                    <p>{userData?.city}</p>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    <p>Zip code</p>
                                    <p>{userData?.zipCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div >
    )
}

export default Index