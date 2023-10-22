import React from 'react'
import { productType } from '../../interface'
import './style.css'
import { IProduct } from '../../service/api'
import { Link } from 'react-router-dom'

interface Props {
    addProductToCart: (id?: string) => void
}
type Iprops = IProduct & Props;


const Index = ({ _id, name, description, rating, price, imageUrl, addProductToCart }: Iprops) => {

    return (
        <div className='product'>
            <Link className='product-link' to={`/products/${_id}`} key={_id} >
                <div className='product-img'>
                    <img src={`../assets/uploads/${imageUrl}`} alt={imageUrl} />
                </div>
                <div className='product-content'>
                    <div className='product-title'>
                        <h2>{name}</h2>
                        <span>${price}</span>
                    </div>
                    <p>{description}</p>
                    <div className='product-notation'>
                        <div className='product-notation-stars'>
                            <i data-star={rating?.rate}></i>
                        </div>
                        <span>({rating?.count})</span>
                    </div>
                </div>
            </Link >
            <button className='product-add' onClick={() => addProductToCart(_id)}>Add to Cart</button>
        </div>
    )
}

export default Index