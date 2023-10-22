import React from 'react'
import { IProduct } from '../../service/api'
import './style.css'
import { Link } from 'react-router-dom'
import { TbTruckDelivery } from 'react-icons/tb'
import { PiShoppingBagOpenDuotone } from 'react-icons/pi'
import InputNumber from '../InputNumber'
interface Props {
    addProductToCart: (_id?: string) => void
}

type Iprops = IProduct & Props;
const Index = ({ _id, name, description, rating, price, imageUrl, category, addProductToCart }: Iprops) => {

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
                    <p>{category}</p>
                </li>
            </ul>
            <div className='product-detailed'>
                <div className='product-full-img'>
                    <img src={`../assets/uploads/${imageUrl}`} alt={imageUrl} />
                </div>
                <div className='product-info'>
                    <h2>{name}</h2>
                    <p className='product-description'>{description}</p>
                    <div className='product-notation'>
                        <div className='product-notation-stars'>
                            <i data-star={rating?.rate}></i>
                        </div>
                        <span>({rating?.count})</span>
                    </div>
                    <hr />
                    <div className='product-price'>
                        <h3>{price}$</h3>
                        <p>Suggested payments with 6 months special financing</p>
                    </div>
                    <hr />
                    <div className='flex product-quantity'>
                        <InputNumber />
                        <p>Only <span className='product-remaining'>12 Items</span> Left! <br />Don't miss it</p>
                    </div>
                    <div className='product-btn'>
                        <button className='btn-medium'>Buy Now</button>
                        <button className='btn-medium' onClick={() => addProductToCart(_id)}>Add to Cart</button>
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