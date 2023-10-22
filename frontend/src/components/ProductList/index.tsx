import React, { useMemo } from 'react'
import { ProductData, useGetProductsQuery } from '../../service/api';
import Product from '../Product';

interface IProps {
    selectedFilter: string
    addProductToCart: (productId: string) => void
    products: any
}
const Index = ({ products, selectedFilter, addProductToCart }: IProps) => {

    const filteredData = useMemo(() => {
        let sortedProducts = [...products];
        console.log("selectedFilter", selectedFilter)
        console.log("sortedProducts", sortedProducts)
        if (selectedFilter === 'price') {
            sortedProducts.sort((a: any, b: any) => a.price - b.price);
        } else if (selectedFilter === 'rating') {
            sortedProducts.sort((a: any, b: any) => b.rating.rate - a.rating.rate);
        }

        return sortedProducts;
    }, [products, selectedFilter]);


    return (
        <>
            {filteredData && filteredData.map((product: any, index: any,) =>
                <Product key={index} {...product} addProductToCart={addProductToCart} />
            )}
        </>
    )
}

export default Index