import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Navigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'
import { useGetUserQuery, useUpdateUserMutation } from '../../redux/api/userApi';
import { useAppSelector } from '../../redux/store';



const Index = () => {
    const { isAuthenticated } = useAppSelector((state) => state.user);

    const { data: user, isLoading, isError, error } = useGetUserQuery("")
    const [updateUser] = useUpdateUserMutation()
    const [editMode, setEditMode] = useState(false)

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: "",
        avatar: "",
        role: "",
        city: "",
        phone: "",
        country: "",
        zipCode: "",
    })
    useEffect(() => {
        const [firstName = '', lastName = ''] = user?.name?.split(' ') ?? [];
        if (user) {
            setUserData({
                firstName,
                lastName,
                email: user.email || '',
                avatar: user.avatar || '',
                role: user.role || '',
                city: user.city || '',
                phone: user.phone || '',
                country: user.country || '',
                zipCode: user.zipCode || '',
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
        const updatedUser = {
            ...userData,
            name: `${userData.firstName} ${userData.lastName}`.trim(),
        };
        updateUser(updatedUser)
        setEditMode(false)
    }

    if (!isAuthenticated) return <Navigate to="/" />;
    if (isLoading) return <div>Chargement...</div>;
    if (isError) return <div>Erreur : {(error as any)?.data?.message || 'Impossible de récupérer les infos'}</div>;

    const renderTextField = (id: string, label: string, value: string) => (
        <FormControl fullWidth className='profile-controle'>
            <TextField id={id} label={label} variant="outlined" value={value} onChange={handleChangeValue} />
        </FormControl>
    );
    return (
        <div className='profile'>
            {editMode ? <>
                <div className='flex space-between align-items-center'>
                    <h2>Profile</h2>
                    <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEditMode(!editMode)}>
                        Cancel
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
                                    {renderTextField('lastName', 'Nom', userData.lastName)}
                                </div>
                                <div className='profile-controle width-half'>
                                    {renderTextField('firstName', 'Prénom', userData.firstName)}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    {renderTextField('email', 'Email', userData.email)}
                                </div>
                                <div className='profile-controle width-half'>
                                    {renderTextField('phone', 'Téléphone', userData.phone)}
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
                                    {renderTextField('country', 'Pays', userData.country)}
                                </div>
                                <div className='profile-controle width-half'>
                                    {renderTextField('city', 'Ville', userData.city)}
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='profile-controle width-half'>
                                    {renderTextField('zipCode', 'Code postal', userData.zipCode)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex space-between'>
                        <Button variant="outlined" color="error" onClick={() => setEditMode(!editMode)}>
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
                        <Button variant="outlined" sx={{ width: "75px", height: "25px", padding: "15px", fontSize: "12px", borderRadius: "18px" }} onClick={() => setEditMode(!editMode)}>
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
                                    <p>{[userData?.firstName, userData?.lastName].join(' ')}</p>
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
                                    <p>{userData.lastName}</p>
                                </div>
                                <div className='profile-controle width-half'>
                                    <p>First Name</p>
                                    <p>{userData.firstName}</p>
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