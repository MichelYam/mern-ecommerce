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

const Index = () => {

    const [shoppingCart, setShoppingCart] = useState<any>([]);
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    // let decodedToken: any = {}
    // if (token !== null) {
    //     decodedToken = jwt_decode(token);
    // }

    useEffect(() => {
        const savedCartItems = localStorage.getItem("cart_items");
        if (savedCartItems) {
            setShoppingCart(JSON.parse(savedCartItems));
        }
    }, [])

    const handleCheckout = () => {
        navigate('/login')
    };

    {/* <Product key={`cart-product-${index}`} {...item} /> */ }
    return (
        // <div className='cart'>
        //     <div className='card cart-product'>
        //         <div className='cart-review'>
        //             <h2>Review Item And Shipping</h2>
        //             {shoppingCart && shoppingCart.map((item: any, index: number) => (
        //                 < div key={index} className='cart-review-info flex' >
        //                     <div style={{ gap: "35px", alignItems: "center" }} className='flex'>
        //                         <div className='cart-review-info-img'>
        //                             <img src={`../assets/uploads/${item.imageUrl}`} alt="esff" />
        //                         </div>
        //                         <div className='product-cart-title'>
        //                             <h3>{item.name}</h3>
        //                             <p>Color: Pink</p>
        //                             <span className='product'>delete</span>
        //                         </div>
        //                     </div>
        //                     <div className='cart-product-price'>
        //                         <p>${item.price}</p>
        //                         <p>Quantity: {item.quantity}</p>
        //                     </div>
        //                 </div>
        //             )
        //             )}
        //             <div className='cart-total-price'>
        //                 <div>
        //                     <span>Subtotal {shoppingCart.length} :</span>
        //                     <span> ${calculateCartTotal(shoppingCart)}</span>
        //                 </div>
        //                 {token ?
        //                     <Button variant="outlined">Checkout</Button> :
        //                     <Button onClick={handleCheckout} variant="outlined">Checkout</Button>}
        //             </div>
        //         </div >
        //     </div>
        //     {/* <div className='card box'>
        //         <div>Subtotal ({shoppingCart.length} {shoppingCart.length > 1 ? "products" : "product"}) : ${calculateCartTotal(shoppingCart)} </div>
        //         <Link to={"/checkout"}>Checkout</Link>
        //     </div> */}
        // </div >
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
                            {token ? <Button variant="outlined">Checkout</Button> :
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