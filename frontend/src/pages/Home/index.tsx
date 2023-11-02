import React, { useMemo, useState } from 'react'
import Product from '../../components/Product'
import Hero from '../../components/Hero'

import jwt_decode from 'jwt-decode';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ProductList from '../../components/ProductList';
import { IProduct, ProductData, useGetProductsQuery, useUpdateCartMutation } from '../../redux/api/api';
import { useAppSelector } from '../../redux/store';
const Index = () => {

    const [selectedFilter, setSelectedFilter] = useState("");
    const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery<ProductData>("undefined");
    const [updateCart] = useUpdateCartMutation();
  
    // const { data: cart } = useGetCartQuery<cartData>("");
    if (isLoading) return <div>
        <Skeleton />
        <Skeleton width="60%" />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" /></div>;
    if (error) return <div>Something went horrible wrong ...</div>;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        console.log(value);
        setSelectedFilter(value);
    };
    const test = {
        quantity: 1
    }
    // Handle add item From Cart
    const addProductToCart = (product: IProduct) => {
        const newProduct = { ...product }

        newProduct.quantity = 1;
        newProduct.totalPrice = newProduct.quantity * product.price;
        newProduct.totalPrice = parseFloat(newProduct.totalPrice.toFixed(2));
        newProduct.inventory = product.quantity;

        let newCartItems = [];
        // const newProduct: any = { ...product, quantity: 1, totalPrice: (product.price * 1).toFixed(2) }
        const cartItems = JSON.parse(localStorage.getItem("cart_items") as any);
        if (cartItems) {
            newCartItems = [...cartItems, newProduct];
        } else {
            newCartItems.push(newProduct);
        }
        console.log(newCartItems)
        localStorage.setItem("cart_items", JSON.stringify(newCartItems));

    }
    return (
        <>
            <Hero />
            <div className='products-sort'>
                <select name="sort" id="sort" value={selectedFilter} onChange={handleChange}>
                    <option value="">Sort by</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div className='products'>
                <ProductList products={products} selectedFilter={selectedFilter} addProductToCart={addProductToCart} />
            </div >
        </>
    )
}

export default Index
