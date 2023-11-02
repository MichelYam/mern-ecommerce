import React from 'react'

import './style.css'
import { Link } from 'react-router-dom'
import { TbTruckDelivery } from 'react-icons/tb'
import { PiShoppingBagOpenDuotone } from 'react-icons/pi'
import InputNumber from '../InputNumber'
import { IProduct } from '../../redux/api/api'
interface Props {
    addProductToCart: (product?: IProduct) => void
    product?: IProduct
}

const Index = ({ product, addProductToCart }: Props) => {

    return (
        <>
            <ul className='product-path'>
                <li>
                    <Link to={"/"}>Products </Link>
                </li>
                <li>
                    /
                </li>
                <li>
                    <p>{product?.category}</p>
                </li>
            </ul>
            <div className='product-detailed'>
                <div className='product-full-img'>
                    <img src={`../assets/uploads/${product?.imageUrl}`} alt={product?.imageUrl} />
                </div>
                <div className='product-info'>
                    <h2>{product?.name}</h2>
                    <p className='product-description'>{product?.description}</p>
                    <div className='product-notation'>
                        <div className='product-notation-stars'>
                            <i data-star={product?.rating?.rate}></i>
                        </div>
                        <span>({product?.rating?.count})</span>
                    </div>
                    <hr />
                    <div className='product-price'>
                        <h3>{product?.price}$</h3>
                        <p>Suggested payments with 6 months special financing</p>
                    </div>
                    <hr />
                    <div className='flex product-quantity'>
                        <InputNumber />
                        <p>Only <span className='product-remaining'>12 Items</span> Left! <br />Don't miss it</p>
                    </div>
                    <div className='product-btn'>
                        <button className='btn-medium'>Buy Now</button>
                        <button className='btn-medium' onClick={() => addProductToCart(product)}>Add to Cart</button>
                    </div>
                    <div className='product-delivery'>
                        <div className='flex product-delivery-option'>
                            <TbTruckDelivery />
                            <div className='flex flex-direction-columns'>
                                <p> Free Delivery</p>
                                <p>Enter your Postal code for Delivery Availability</p>
                            </div>
                        </div>
                        <div className='flex product-delivery-option'>
                            <PiShoppingBagOpenDuotone />
                            <div className='flex flex-direction-columns'>
                                <p>Return Delivery</p>
                                <p>Free 30days Delivery Returns. Details</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index