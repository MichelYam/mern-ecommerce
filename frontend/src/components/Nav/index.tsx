import React from 'react'
import logo from "../../assets/logo/shoppingCart.png"
import { TbShoppingCartPlus } from 'react-icons/tb'
import { GoPerson } from 'react-icons/go'
import { AiOutlineSearch } from "react-icons/ai";

import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { clearStorage } from '../../utils/TokenStorage';

import {
    createTheme,
    PaletteColorOptions,
    ThemeProvider,
} from '@mui/material/styles';
import { useAppSelector } from '../../redux/store';
import './style.css'



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

    const [anchorUser, setAnchorUser] = React.useState<null | HTMLElement>(null);
    const openUser = Boolean(anchorUser);
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
                                    <MenuItem onClick={handleUserClose}><Link to={"/profile"}>Profile</Link></MenuItem>
                                    <MenuItem onClick={handleUserClose}><Link to={"/orders"}>Orders</Link></MenuItem>
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
    )
}

export default Index