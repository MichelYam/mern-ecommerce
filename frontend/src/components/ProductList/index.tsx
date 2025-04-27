import React, { useMemo } from 'react'

import Product from '../Product';
import { IProduct } from '../../redux/api/productApi';

interface IProps {
    selectedFilter: string
    addProductToCart: (product: IProduct) => void
    products: any
}
const Index = ({ products, selectedFilter, addProductToCart }: IProps) => {

    const filteredData = useMemo(() => {
        let sortedProducts = [...products];

        if (selectedFilter === 'price') {
            sortedProducts.sort((a: any, b: any) => a.price - b.price);
        } else if (selectedFilter === 'rating') {
            sortedProducts.sort((a: any, b: any) => a.rating.rate - b.rating.rate);
        }

        return sortedProducts;
    }, [products, selectedFilter]);


    return (
        <>
            {filteredData && filteredData.map((product: any, index: any,) =>
                <Product key={index} product={product} addProductToCart={() => addProductToCart(product)} />
            )}
        </>
    )
}

export default Index