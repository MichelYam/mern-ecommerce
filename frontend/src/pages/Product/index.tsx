import React, { useEffect } from 'react'
import ProductView from '../../components/ProductView'
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { IProduct, ProductData, cartData, useGetProductByIdQuery, useGetUserCartQuery, useUpdateCartMutation } from '../../service/api'

const Index = () => {
    const { id } = useParams(); //get id form url
    const navigate = useNavigate()
    const { data: product, isLoading, isSuccess, isError, error } = useGetProductByIdQuery(id);
    const token = localStorage.getItem('token')
    const [updateCart] = useUpdateCartMutation()

    let decodedToken: any = {}
    if (token !== null) {
        decodedToken = jwt_decode(token);
        // console.log(decodedToken.sub);
    }
    const { data: cart } = useGetUserCartQuery<cartData>(decodedToken.sub);

    // console.log(product)
    const addProductToCart = (productId?: string) => {
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
    useEffect(() => {
        if (product === null) {
            navigate("/error");
        }
    }, [])

    return (
        <>
            <ProductView {...product?.products} addProductToCart={addProductToCart} />
        </>
    )
}

export default Index