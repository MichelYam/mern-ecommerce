import React, { useEffect, useState } from 'react'
//Router

import { Link, useNavigate } from "react-router-dom";

// functions
import { calculateCartTotal } from '../../utils/cart';

// Material Component
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

//CSS
import './style.css'
import { useCreateCartMutation, useGetCartQuery } from '../../redux/api/api';
import { useAppDispatch, useAppSelector } from '../../redux/store';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const getCartItems = (cartItems: any[]) => {
    const newCartItems: any = [];
    cartItems.map(item => {
        const newItem: any = {};
        newItem.quantity = item.quantity;
        newItem.price = item.price;
        newItem.taxable = item.taxable;
        newItem.product = item._id;
        newCartItems.push(newItem);
    });
    console.log("newCartItems", newCartItems)
    return newCartItems;
};

const Index = () => {

    const [shoppingCart, setShoppingCart] = useState<any>([]);
    const [createCart] = useCreateCartMutation()
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useAppSelector((state) => state.user);
    const savedCartItems = localStorage.getItem("cart_items");
    const { data: cart } = useGetCartQuery(userInfo?.id)
    useEffect(() => {
        if (savedCartItems) {
            setShoppingCart(JSON.parse(savedCartItems));
        }
    }, [])

    const handleCheckout = () => {
        navigate('/login')
    };
    const handleCheckoutSucess = () => {
        // if(cartExist){
        // update Cart 
        // }else{
        //      if (savedCartItems) {
        //     const data = JSON.parse(savedCartItems)
        //     const products = getCartItems(data)
        //     createCart(products)
        //     navigate("/cart/checkout")
        // }
        // }
        if (savedCartItems) {
            const data = JSON.parse(savedCartItems)
            const products = getCartItems(data)
            createCart(products)
            navigate("/cart/checkout")
        }
    };
    {/* <Product key={`cart-product-${index}`} {...item} /> */ }
    console.log("cart", cart)

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom> */}
                <div className='cart-review'>
                    <h2>Review Item And Shipping</h2>
                    {shoppingCart && shoppingCart.map((item: any, index: number) => (
                        < div key={index} className='cart-review-info flex' >
                            <div style={{ gap: "35px", alignItems: "center" }} className='flex'>
                                <div className='cart-review-info-img'>
                                    <img src={`../assets/uploads/${item.imageUrl}`} alt="esff" />
                                </div>
                                <div className='product-cart-title'>
                                    <h3>{item.name}</h3>
                                    <p>Color: Pink</p>
                                    <span className='product'>delete</span>
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
            <CardActions>
                {/* <Button size="small">Proceed to checkout</Button> */}
                {/* <div>Subtotal ({shoppingCart.length} {shoppingCart.length > 1 ? "products" : "product"}) : ${calculateCartTotal(shoppingCart)} </div>
                <Link to={"/checkout"}>Checkout</Link> */}
            </CardActions>
        </Card>
    )
}

export default Index