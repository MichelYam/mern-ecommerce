import React from 'react'
import { ProductData, useGetProductByIdQuery } from '../../service/api'
import './style.css'
interface Props {
    id?: string,
    quantity?: number
}
const Index = ({ id, quantity }: Props) => {
    const { data: item } = useGetProductByIdQuery<ProductData>(id)
    return (
        <>
            <li className="clearfix">
                <img src={item?.image} alt={item?.title} />
                <span className="item-name">{item?.title}</span>
                <span className="item-price">${item?.price}</span>
                <span className="item-quantity">Quantity: {quantity}</span>
            </li>
        </>
    )
}

export default Index