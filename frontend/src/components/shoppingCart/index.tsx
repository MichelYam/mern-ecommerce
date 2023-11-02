import React from 'react'
import './style.css'

import CloseIcon from '@mui/icons-material/Close';
import { IProduct } from '../../redux/api/api';

const Index = ({ _id, imageUrl, name, price, quantity }: IProduct) => {
    // // Handle Remove item From Cart
    const handleRemoveFromCart = (_id: string | number | undefined) => {

        const cartItems = JSON.parse(localStorage.getItem("cart_items") as any);
        const newCartItems = cartItems.filter((item: { _id: string | number | undefined; }) => item._id !== _id);
        localStorage.setItem("cart_items", JSON.stringify(newCartItems));
        
        // dispatch(calculateCartTotal());!
        // dispatch(toggleCart());
    };
    return (
        <li className="shopping-cart-item">
            <div className='shopping-cart-item--image'>
                <img src={`../assets/uploads/${imageUrl}`} alt={name} />
            </div>
            <div className='shopping-cart-item--title'>
                <span className="item-name">{name}</span>
                <div className='shopping-cart-item--price'>
                    <span className="item-price">${price}</span>
                    <span className="item-quantity">Quantity: {quantity}</span>
                </div>
            </div>
            <div className='shopping-cart-item--remove' onClick={() => handleRemoveFromCart(_id)}>
                <CloseIcon />
            </div>
        </li>
    )
}

export default Index