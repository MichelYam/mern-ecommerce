import React, { useEffect } from 'react'

import "./style.css";

const Index = () => {

    useEffect(() => {
        // Suppression du panier dans le localStorage
        localStorage.removeItem('cart_items');
        localStorage.removeItem('cart_price');
    }, []);
    return (
        <div className="confirmation-box">
            <h1>Thank you for your order!</h1>
            <p>Your order has been placed successfully. A confirmation email has been sent to you.</p>

            <div className="order-info">
                {/* <p><strong>Numéro de commande :</strong> {orderId}</p>
                <p><strong>Date :</strong> {orderDate}</p>
                <p><strong>Livraison estimée :</strong> {estimatedDelivery}</p> */}
                <p><strong>Order number :</strong> 21968515105189651</p>
                <p><strong>Date :</strong> 03/05/2035</p>
                <p><strong>Estimated delivery :</strong> 09/05/2035</p>
            </div>

            <div className="links">
                <a href="/orders" className="orders-link">View my orders</a>
                <a href="/" className="home-link">Back to home</a>
            </div>
        </div>
    )
}

export default Index