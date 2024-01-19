import React, { useCallback, useEffect, useState } from 'react'
import logo from "../../assets/logo/shopping-cart.png"
import { TbShoppingCartPlus } from 'react-icons/tb'
import { GoPerson } from 'react-icons/go'
import { AiOutlineSearch } from "react-icons/ai";

import './style.css'
import { Link } from 'react-router-dom';

import DropdownMenu from '../DropdownMenu';
import jwt_decode from 'jwt-decode';

import ShoppingCart from '../ShoppingCart';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { clearStorage } from '../../utils/TokenStorage';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDropzone } from 'react-dropzone'
import { calculateCartTotal } from '../../utils/cart';
import {
    createTheme,
    PaletteColorOptions,
    ThemeProvider,
} from '@mui/material/styles';
import { Categories, ICart, useAddProductMutation, useGetCategoriesQuery } from '../../redux/api/api';
import { useAppSelector } from '../../redux/store';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
declare module '@mui/material/styles' {
    interface CustomPalette {
        anger: PaletteColorOptions;
        apple: PaletteColorOptions;
        steelBlue: PaletteColorOptions;
        violet: PaletteColorOptions;
        black: PaletteColorOptions;
    }
    interface Palette extends CustomPalette { }
    interface PaletteOptions extends CustomPalette { }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        anger: true;
        apple: true;
        steelBlue: true;
        violet: true;
        black: true;
    }
}
const Index = () => {
    const { data: categories } = useGetCategoriesQuery<Categories>("undefined");
    const [addProduct] = useAddProductMutation<Categories>();
    const [product, setProduct] = useState({
        name: "",
        description: "",
        quantity: "",
        price: "",
        brand: "",
        imageUrl: ""
    })

    const [cart, setCart] = useState<ICart | any>([])

    // const [isOpenProduct, setIsOpenProduct] = useState(false)
    // const [preview, setPreview] = useState<any>("")

    // Handle dropDown state
    const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null);
    const [anchorCart, setAnchorCart] = React.useState<null | HTMLElement>(null);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const openUser = Boolean(anchorUser);
    const openCart = Boolean(anchorCart);

    const { isAuthenticated } = useAppSelector((state) => state.user);

    const { palette } = createTheme();
    const { augmentColor } = palette;
    const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });
    const theme = createTheme({
        palette: {
            anger: createColor('#F40B27'),
            apple: createColor('#5DBA40'),
            steelBlue: createColor('#5C76B7'),
            violet: createColor('#BC00A3'),
            black: createColor('#000000'),
        },
    });
    // let decodedToken: any = {}
    // if (token !== null) {
    //     decodedToken = jwt_decode(token);
    // }
    useEffect(() => {

    }, [])

    useEffect(() => {
        const savedCartItems = localStorage.getItem("cart_items");
        if (savedCartItems) {
            setCart(JSON.parse(savedCartItems));
        }
    }, [])

    // const onDrop = useCallback((acceptedFiles: any) => {
    //     const file = new FileReader;
    //     file.onload = () => {
    //         setPreview(file.result)
    //     }
    //     file.readAsDataURL(acceptedFiles[0])
    // }, [])

    // const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleOptionSelect = (option: string) => {
        console.log('Selected option:', option);
    };

    const logOut = () => {
        clearStorage()
        window.location.reload();
    }

    const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorUser(event.currentTarget);
    };
    const handleUserClose = () => {
        setAnchorUser(null);
    };
    const handleCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorCart(event.currentTarget);
    };
    const handleCartClose = () => {
        setAnchorCart(null);
    };
    // const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setProduct({
    //         ...product,
    //         [event.target.id]: event.target.value,
    //     })
    // }

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (typeof acceptedFiles[0] === 'undefined') return;
    //     const newData = {
    //         ...product,
    //         imageUrl: acceptedFiles[0].name
    //     }

    //     addProduct(newData)
    //     setIsOpenProduct(false)
    // }
    return (
        <ThemeProvider theme={theme}>
            <nav className="nav">
                <div className='logo'>
                    <img src={logo} alt="logo du site" />
                    <Link to={'/'}>
                        <h1>ShopCart</h1>
                    </Link>
                </div>
                <ul className='navigation'>
                    <li>
                        <DropdownMenu options={categories} onSelect={handleOptionSelect} title="Categories" />
                    </li>
                    <li>Deals</li>
                    <li>What's New</li>
                    <li>Delivery</li>
                </ul>
                <div className='header-search'>
                    <input type="text" placeholder='Search Product' />
                    <AiOutlineSearch />
                </div>
                <div className='nav-right'>
                    <div className='nav-user-status'>
                        {isAuthenticated ?
                            <div className="dropdown-menu">
                                <Button
                                    id="basic-button"
                                    variant='text'
                                    color='black'
                                    aria-controls={openUser ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openUser ? 'true' : undefined}
                                    onClick={handleUserClick}
                                    startIcon={<GoPerson />}
                                >
                                    Me
                                </Button>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorUser}
                                    open={openUser}
                                    onClose={handleUserClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleUserClose}><Link to={"/account"}>Profile</Link></MenuItem>
                                    <MenuItem onClick={logOut}>Logout</MenuItem>
                                </Menu>
                            </div>
                            :
                            <Link to={'/login'}>
                                <Button color='black' variant="text" startIcon={<GoPerson />}>
                                    Account
                                </Button>
                            </Link>}
                    </div>
                    <div className='dropdown-shopping'>
                        <Link to={"/cart"}>
                            <Button color='black' variant='text' startIcon={<TbShoppingCartPlus />}>
                                Cart
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav >
        </ThemeProvider>
        // <Modal open={isOpenProduct} onClose={() => setIsOpenProduct(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        //     <Box sx={style}>
        //         <h2>Create a new product</h2>
        //         <form className='create' onSubmit={handleSubmit}>
        //             <FormControl sx={{ m: 1, with: "100%" }}>
        //                 <TextField id="name" label="Name" variant="outlined" onChange={handleChangeValue} required />
        //             </FormControl>
        //             <FormControl sx={{ m: 1 }}>
        //                 <TextField id="description" label="Description" variant="outlined" multiline maxRows={4} onChange={handleChangeValue} />
        //             </FormControl>
        //             <FormControl sx={{ m: 1, with: "100%" }}>
        //                 <TextField id="quantity" label="Quantity" variant="outlined" onChange={handleChangeValue} required />
        //             </FormControl>
        //             <FormControl sx={{ m: 1, with: "100%" }}>
        //                 <TextField id="brand" label="Brand" variant="outlined" onChange={handleChangeValue} required />
        //             </FormControl>
        //             <FormControl sx={{ m: 1, with: "100%" }}>
        //                 <TextField type='number' id="price" label="Price" inputProps={{
        //                     maxLength: 13,
        //                 }} onChange={handleChangeValue} required />
        //             </FormControl>
        //             <FormControl sx={{ m: 1, with: "100%" }}>
        //                 <div {...getRootProps()}>
        //                     <input {...getInputProps()} />
        //                     {
        //                         isDragActive ?
        //                             <p>Drop the files here ...</p> :
        //                             <p>Drag 'n' drop some files here, or click to select files</p>
        //                     }
        //                 </div>
        //                 <img className='preview-img' src={preview} height="200" />
        //             </FormControl>
        //             <div className='group-btn'>
        //                 <Button onClick={() => setIsOpenProduct(false)} variant="contained">Cancel</Button>
        //                 <Button type='submit' variant="contained">Create</Button>
        //             </div>
        //         </form>
        //     </Box>
        // </Modal >
    )
}

export default Index