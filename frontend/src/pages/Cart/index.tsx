import React, { useEffect, useState } from 'react'
//Router

import { useNavigate } from "react-router-dom";

// functions
import { calculateCartTotal } from '../../utils/cart';

// Material Component
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
//CSS
import './style.css'
// import { useCreateCartMutation, useGetUserQuery } from '../../redux/api/api';
import { useAppSelector } from '../../redux/store';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useCreateCartMutation } from '../../redux/api/cartApi';
import { useGetUserQuery } from '../../redux/api/userApi';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

const getCartItems = (cartItems: any[]) => {
    const newCartItems: any = [];
    cartItems.map(item => {
        const newItem: any = {};
        newItem.quantity = item.quantity;
        newItem.price = item.price;
        newItem.description = item.description;
        newItem.taxable = item.taxable;
        newItem._id = item._id;
        newCartItems.push(newItem);
    });
    return newCartItems;
};

const Index = () => {

    const [shoppingCart, setShoppingCart] = useState<any>([]);
    const [createCart] = useCreateCartMutation()
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAppSelector((state) => state.user);
    const yrdy = useAppSelector((state) => state.user);

    // Load shoppingCart from local storage on app startup
    const savedCartItems = localStorage.getItem("cart_items");
    useEffect(() => {
        if (savedCartItems) {
            setShoppingCart(JSON.parse(savedCartItems));
        }
    }, [])

    // Update local storage whenever shoppingCart change
    useEffect(() => {
        localStorage.setItem('cart_items', JSON.stringify(shoppingCart));
    }, [shoppingCart]);

    const handleCheckout = () => {
        navigate('/login')
    };
    const handleCheckoutSucess = async () => {
        // console.log("shoppingCart", shoppingCart)
        // console.log("user", user)
        if (shoppingCart) {
            const products = getCartItems(shoppingCart)
            createCart(products)

            const stripe = await stripePromise
            const checkoutSession = await axios.post(`${process.env.REACT_APP_API_URL}stripe/pay`, {
                items: shoppingCart,
                userId: user?.id
            })

            const result = await stripe?.redirectToCheckout({
                sessionId: checkoutSession.data.id

            })
            if (result?.error) alert(result.error.message)

        }
    };

    const deleteItem = (id: any) => {
        const updateCart = shoppingCart.filter((item: { _id: any; }) => item._id !== id)
        setShoppingCart(updateCart);

    }
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div className='cart-review'>
                    <h2>Review Item And Shipping</h2>
                    {shoppingCart && shoppingCart.map((item: any, index: number) => (
                        < div key={index} className='cart-review-info flex'>
                            <div style={{ gap: "35px", alignItems: "center" }} className='flex'>
                                <div className='cart-review-info-img'>
                                    <img src={`../assets/uploads/${item.imageUrl}`} alt="esff" />
                                </div>
                                <div className='product-cart-title'>
                                    <h3>{item.name}</h3>
                                    <p>Color: Pink</p>
                                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteItem(item._id)}>delete</Button>
                                </div>
                            </div>
                            <div className='cart-product-price'>
                                <p>${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    )
                    )}
                    <div className='cart-total-price'>
                        <div>
                            <span>Subtotal {shoppingCart.length} :</span>
                            <span> ${calculateCartTotal(shoppingCart)}</span>
                        </div>
                        <CardActions>
                            {isAuthenticated ? <Button onClick={handleCheckoutSucess} variant="outlined">Checkout</Button> :
                                <Button onClick={handleCheckout} variant="outlined">Checkout</Button>
                            }
                        </CardActions>
                    </div>
                </div >
            </CardContent>
        </Card>
    )
}

export default Index