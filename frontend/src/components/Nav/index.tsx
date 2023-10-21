import React, { useCallback, useState } from 'react'
import logo from "../../assets/logo/shopping-cart.png"
import { TbShoppingCartPlus } from 'react-icons/tb'
import { GoPerson } from 'react-icons/go'
import { AiOutlineSearch } from "react-icons/ai";

import './style.css'
import { Link } from 'react-router-dom';
import { Categories, cartData, useAddProductMutation, useGetCategoriesQuery, useGetUserCartQuery } from '../../service/api';
import DropdownMenu from '../DropdownMenu';
import jwt_decode from 'jwt-decode';

import ShoppingCart from '../shoppingCart';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { clearStorage } from '../../utils/TokenStorage';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import FileDrop from '../FileDrop';
import { useDropzone } from 'react-dropzone'

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

const Index = () => {
    const { data: categories } = useGetCategoriesQuery<Categories>("undefined");
    const [addProduct] = useAddProductMutation<Categories>();
    const [product, setProduct] = useState({
        // sku: "",
        name: "",
        description: "",
        quantity: "",
        price: "",
        // taxable: "",
        // isActive: "",
        brand: "",
        imageUrl: ""
    })
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenProduct, setIsOpenProduct] = useState(false)
    const [preview, setPreview] = useState<any>("")
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    let decodedToken: any = {}
    if (token !== null) {
        decodedToken = jwt_decode(token);
    }
    const onDrop = useCallback((acceptedFiles: any) => {
        const file = new FileReader;
        console.log(acceptedFiles)
        file.onload = () => {
            setPreview(file.result)
        }
        file.readAsDataURL(acceptedFiles[0])
    }, [])

    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const { data: cart } = useGetUserCartQuery<cartData>(decodedToken.sub);
    const handleOptionSelect = (option: string) => {
        console.log('Selected option:', option);
    };
    const logOut = () => {
        clearStorage()
        window.location.reload();
    }
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [event.target.id]: event.target.value,
        })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (typeof acceptedFiles[0] === 'undefined') return;
        const newData = {
            ...product,
            imageUrl: acceptedFiles[0].name
        }

        // console.log(newData)
        // formData.append('upload_preset', "test-react-uploads-unsigned")
        // formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
        addProduct(newData)
        setIsOpenProduct(false)
    }
    return (
        <>
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
                        {token ?
                            <div className="dropdown-menu">
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <GoPerson />
                                    Me
                                </Button>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}><Link to={"/account"}>My account</Link></MenuItem>
                                    <MenuItem onClick={() => setIsOpenProduct(true)}>Add Product</MenuItem>
                                    <MenuItem onClick={logOut}>Logout</MenuItem>
                                </Menu>
                            </div>
                            :
                            <Link to={'/login'}>
                                <GoPerson />
                                <span className="text-3xl font-bold underline text-red-600">Account</span>
                            </Link>}
                    </div>
                    <div className='dropdown-shopping'>
                        <div onClick={() => setIsOpen(!isOpen)}>
                            <TbShoppingCartPlus />
                            <span>Cart</span>
                        </div>
                        {isOpen && <div className="shopping-cart">
                            <div className="shopping-cart-header">
                                <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">3</span>
                                <div className="shopping-cart-total">
                                    <span className="lighter-text">Total:</span>
                                    <span className="main-color-text">$2,229.97</span>
                                </div>
                            </div>

                            <ul className="shopping-cart-items">
                                {
                                    !cart && <p> Your shopping cart is empty</p>
                                }
                                {cart && cart.map((item: any) => {
                                    console.log(cart)
                                    // <p>{p.products}</p>
                                    return item.products.map((product: any) => {
                                        return <ShoppingCart key={product.productId} id={product.productId} quantity={product.quantity} />
                                    })
                                })}
                            </ul>
                            <Link to="/checkout" className="button">Checkout</Link>
                        </div>}
                    </div>
                </div>
            </nav>
            <Modal open={isOpenProduct} onClose={() => setIsOpenProduct(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <h2>Create a new product</h2>
                    <form className='create' onSubmit={handleSubmit}>
                        <FormControl sx={{ m: 1, with: "100%" }}>
                            <TextField id="name" label="Name" variant="outlined" onChange={handleChangeValue} required />
                        </FormControl>
                        <FormControl sx={{ m: 1 }}>
                            <TextField id="description" label="Description" variant="outlined" multiline maxRows={4} onChange={handleChangeValue} />
                        </FormControl>
                        <FormControl sx={{ m: 1, with: "100%" }}>
                            <TextField id="quantity" label="Quantity" variant="outlined" onChange={handleChangeValue} required />
                        </FormControl>
                        <FormControl sx={{ m: 1, with: "100%" }}>
                            <TextField id="brand" label="Brand" variant="outlined" onChange={handleChangeValue} required />
                        </FormControl>
                        <FormControl sx={{ m: 1, with: "100%" }}>
                            <TextField type='number' id="price" label="Price" inputProps={{
                                maxLength: 13,
                            }} onChange={handleChangeValue} required />
                        </FormControl>
                        <FormControl sx={{ m: 1, with: "100%" }}>
                            {/* <TextField type='file' id="file" onChange={handleChangeValue} required /> */}
                            {/* <FileDrop/> */}
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                }
                            </div>
                            <img className='preview-img' src={preview} height="200" />
                        </FormControl>
                        <div className='group-btn'>
                            <Button onClick={() => setIsOpenProduct(false)} variant="contained">Cancel</Button>
                            <Button type='submit' variant="contained">Create</Button>
                        </div>
                    </form>
                </Box>
            </Modal >
        </>
    )
}

export default Index

