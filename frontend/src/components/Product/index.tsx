import React from 'react'
import { productType } from '../../interface'
import './style.css'
import { IProduct } from '../../service/api'
import { Link } from 'react-router-dom'

interface IProps {
    addProductToCart: (product: IProduct) => void
    product: IProduct
}

const Index = ({ product, addProductToCart }: IProps) => {

    return (
        <div className='product'>
            <Link className='product-link' to={`/products/${product._id}`} key={product._id} >
                <div className='product-img'>
                    <img src={`../assets/uploads/${product.imageUrl}`} alt={product.imageUrl} />
                </div>
                <div className='product-content'>
                    <div className='product-title'>
                        <h2>{product.name}</h2>
                        <span>${product.price}</span>
                    </div>
                    <p>{product.description}</p>
                    <div className='product-notation'>
                        <div className='product-notation-stars'>
                            <i data-star={product.rating?.rate}></i>
                        </div>
                        <span>({product.rating?.count})</span>
                    </div>
                </div>
            </Link >
            <button className='product-add' onClick={() => addProductToCart(product)}>Add to Cart</button>
        </div>
    )
}

export default Index