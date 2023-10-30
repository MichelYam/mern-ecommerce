import React, { useEffect } from 'react'
import ProductView from '../../components/ProductView'
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { IProduct, ProductData, cartData, useGetProductByIdQuery, useGetCartQuery, useUpdateCartMutation } from '../../service/api'

const Index = () => {
    const { id } = useParams(); //get id form url
    const { data: product, isLoading, isSuccess, isError, error } = useGetProductByIdQuery(id);
    const [updateCart] = useUpdateCartMutation()
    const { data: cart } = useGetCartQuery<cartData>("");
    // console.log(product)

    const addProductToCart = (productId?: string) => {
        // console.log("productId", cart)
        // const newProduct: any = { productId: productId, quantity: 1 }
        // const products = { ...cart[0], products: { ...cart[0].products, newProduct } }
        // const cartId = cart[0].id
        // console.log(cartId, products)
        // updateCart({ cartId, ...products }).then((response) => {
        //     console.log("response", response);
        // }).catch((err) => {

        //     console.error("err", err);
        // });
    }
    // useEffect(() => {
    //     if (product === null) {
    //         navigate("/error");
    //     }
    // }, [])

    return (
        <>
            <ProductView {...product} product={product} addProductToCart={() => addProductToCart} />
        </>
    )
}

export default Index