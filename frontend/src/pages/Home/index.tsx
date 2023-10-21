import React, { useMemo, useState } from 'react'
import Product from '../../components/Product'
import Hero from '../../components/Hero'
import { ProductData, cartData, useGetProductsQuery, useGetUserCartQuery, useUpdateCartMutation } from '../../service/api'
import jwt_decode from 'jwt-decode';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ProductList from '../../components/ProductList';
const Index = () => {
    const [selectedFilter, setSelectedFilter] = useState("");
    const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery<ProductData>("undefined");
    const [updateCart] = useUpdateCartMutation()
    const token = localStorage.getItem('token')
    console.log(products)
    let decodedToken: any = {}
    if (token !== null) {
        decodedToken = jwt_decode(token);
        // console.log(decodedToken.sub);
    }

    const { data: cart } = useGetUserCartQuery<cartData>(decodedToken.sub);
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
    const addProductToCart = (productId: string) => {
        console.log("productId", cart)
        const newProduct: any = { productId: productId, quantity: 1 }
        const products = { ...cart[0], products: { ...cart[0].products, newProduct } }
        const cartId = cart[0].id
        console.log(cartId, products)
        updateCart({ cartId, ...products }).then((response) => {
            console.log("response", response);
        }).catch((err) => {
            console.error("err", err);
        });
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
                <ProductList products={products.products}  selectedFilter={selectedFilter} addProductToCart={addProductToCart} />
            </div >
        </>
    )
}

export default Index
