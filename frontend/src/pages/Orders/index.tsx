import React, { useEffect, useState } from 'react'

import "./style.css";
import { RootState, useAppSelector } from '../../redux/store';
import { useGetOrdersQuery } from '../../redux/api/userApi';

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    image: string;
}

interface Order {
    id: string;
    date: string;
    total: number;
    status: string;
    items: OrderItem[];
}

const Index = () => {


    const userId = useAppSelector((state: RootState) => state.user.user?.id);
    const { data: orders, error, isLoading } = useGetOrdersQuery(userId) as { data: Order[] | undefined, error: any, isLoading: boolean };
    console.log("data", orders)

    return (
        <div className="orders-container">
            <h1>My orders</h1>
            {(!orders || orders.length === 0) ? (
                <p>No orders yet.</p>
            ) :
                (
                    orders?.map((order) => (
                        <div className="order-card" key={order.id}>
                            <div className="order-header">
                                <div><strong>Commande :</strong> {order.id}</div>
                                <div><strong>Date :</strong> {order.date}</div>
                                <div><strong>Total :</strong> {order.total} €</div>
                                <div><strong>Statut :</strong> {order.status}</div>
                            </div>
                            <div className="order-items">
                                {order.items.map((item, index) => (
                                    <div className="item" key={index}>
                                        <img src={item.image} alt={item.name} />
                                        <div className="item-details">
                                            <p className="item-name">{item.name}</p>
                                            <p>Quantity : {item.quantity}</p>
                                            <p>Unit price : {item.price.toFixed(2)} €</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
        </div>
    )
}

export default Index