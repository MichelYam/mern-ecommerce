import React, { useState } from 'react'
import Hero from '../../components/Hero'

import Skeleton from '@mui/material/Skeleton';
import ProductList from '../../components/ProductList';
// import { IProduct, ProductData, useGetProductsQuery } from '../../redux/api/api';
import { IProduct, ProductData, useGetProductsQuery } from '../../redux/api/productApi';
import { useLocation } from 'react-router-dom';

const Index = () => {
    const location = useLocation();
    const isOnProductPage = location.pathname === '/';
    const [selectedFilter, setSelectedFilter] = useState("");
    const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery<ProductData>("undefined",{
        skip: !isOnProductPage, //
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

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
    
    //ADD item From Cart
    const addProductToCart = (product: IProduct) => {
        const newProduct = { ...product }
        console.log("product", product)
        newProduct.quantity = 1;
        newProduct.totalPrice = newProduct.quantity * product.price;
        newProduct.totalPrice = parseFloat(newProduct.totalPrice.toFixed(2));
        newProduct.inventory = product.quantity;
        newProduct.description = product.description;

        let newCartItems = [];

        const cartItems = JSON.parse(localStorage.getItem("cart_items") as any);
        if (cartItems) {
            newCartItems = [...cartItems, newProduct];
        } else {
            newCartItems.push(newProduct);
        }
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
