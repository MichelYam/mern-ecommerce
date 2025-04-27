import React from 'react'
import logo from "../../assets/logo/shoppingCart.png"
import { AiOutlineGift } from 'react-icons/ai';
import { IoBag } from "react-icons/io5";
import { SiKlarna } from "react-icons/si";
import { FaStripe, FaCcMastercard, FaApplePay, FaGooglePay } from "react-icons/fa";
import { BiHelpCircle, BiLogoAmazon, BiLogoVisa } from "react-icons/bi";
import { BsPaypal } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import "./style.css"

const Index = () => {
    return (
        <footer>
            <div className='footer-info'>
                <div className='footer-info-item'>
                    <div className='footer-title'>
                        <img style={{ width: "30px", height: "30px" }} src={logo} alt="logo du site" />
                        <Link to={'/'}>
                            <h2 className='footer-title2'>Shopcart</h2>
                        </Link>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur feugiat sapien tortor,
                        ac volutpat urna volutpat vel. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                    </p>
                    <div>
                        <h3>Accepted Payments</h3>
                        <ul className='payments-list flex'>
                            <li className='payments-item'>
                                <FaStripe />
                            </li>
                            <li className='payments-item'>
                                <BiLogoVisa />
                            </li>
                            <li className='payments-item'>
                                <FaCcMastercard />
                            </li>
                            <li className='payments-item'>
                                <BiLogoAmazon />
                            </li>
                            <li className='payments-item'>
                                <SiKlarna />
                            </li>
                            <li className='payments-item'>
                                <BsPaypal />
                            </li>
                            <li className='payments-item'>
                                <FaApplePay />
                            </li>
                            <li className='payments-item'>
                                <FaGooglePay />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='footer-info-item'>
                    <h3>Department</h3>
                    <ul className='jsp'>
                        <li>
                            <Link to={""}>Fashion</Link>
                        </li>
                        <li>
                            <Link to={""}>Education Product</Link>
                        </li>
                        <li>
                            <Link to={""}>Frozen Food</Link>
                        </li>
                        <li>
                            <Link to={""}>Beverages</Link>
                        </li>
                        <li>
                            <Link to={""}>Organic Grocery</Link>
                        </li>
                        <li>
                            <Link to={""}>Office Supplies</Link>
                        </li>
                        <li>
                            <Link to={""}>Beauty Products</Link>
                        </li>
                        <li>
                            <Link to={""}>Books</Link>
                        </li>
                        <li>
                            <Link to={""}>Electronics & Gadget</Link>
                        </li>
                        <li>
                            <Link to={""}>Travel Accesories</Link>
                        </li>
                        <li>
                            <Link to={""}>Fitness</Link>
                        </li>
                        <li>
                            <Link to={""}>Sneakers</Link>
                        </li>
                        <li>
                            <Link to={""}>Toys</Link>
                        </li>
                        <li>
                            <Link to={""}>Furniture</Link>
                        </li>
                    </ul>
                </div>
                <div className='footer-info-item'>
                    <h3>About us</h3>
                    <ul className='jsp'>
                        <li>
                            <Link to={""}>About Shopcart</Link>
                        </li>
                        <li>
                            <Link to={""}>Careers</Link>
                        </li>
                        <li>
                            <Link to={""}>News & Blog</Link>
                        </li>
                        <li>
                            <Link to={""}>Help</Link>
                        </li>
                        <li>
                            <Link to={""}>Press Center</Link>
                        </li>
                        <li>
                            <Link to={""}>Shop by location</Link>
                        </li>
                        <li>
                            <Link to={""}>Shopcart Brands</Link>
                        </li>
                        <li>
                            <Link to={""}>Affiliate & Partners</Link>
                        </li>
                        <li>
                            <Link to={""}>Ideas & Guides</Link>
                        </li>

                    </ul>
                </div>
                <div className='footer-info-item'>
                    <h3>Services</h3>
                    <ul className='jsp'>
                        <li>
                            <Link to={""}>Gift Card</Link>
                        </li>
                        <li>
                            <Link to={""}>Mobile App</Link>
                        </li>
                        <li>
                            <Link to={""}>Shipping & Delivery</Link>
                        </li>
                        <li>
                            <Link to={""}>Order Pickup</Link>
                        </li>
                        <li>
                            <Link to={""}>Account Signup</Link>
                        </li>
                    </ul>
                </div>
                <div className='footer-info-item'>
                    <h3>Help</h3>
                    <ul className='jsp'>
                        <li>
                            <Link to={""}>Shopcart Help</Link>
                        </li>
                        <li>
                            <Link to={""}>Returns</Link>
                        </li>
                        <li>
                            <Link to={""}>Track orders</Link>
                        </li>
                        <li>
                            <Link to={""}>Contact us</Link>
                        </li>
                        <li>
                            <Link to={""}>Feedback</Link>
                        </li>   <li>
                            <Link to={""}>Security & Fraud</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='footer-bot'>
                <div className='footer-help flex'>
                    <div className='footer-help-item flex'>
                        <IoBag />
                        <p>Become seller</p>
                    </div>
                    <div className='footer-help-item flex'>
                        <AiOutlineGift />
                        <p>Gift Cards</p>
                    </div>
                    <div className='footer-help-item flex'>
                        <BiHelpCircle />
                        <p>Help Center</p>
                    </div>
                </div>
                <div className='footer-private'>
                    <p>Terms Of Use</p>
                    <p>Privacy Policy</p>
                </div>
                <div className='footer-copyright'>
                    All Right reserved by Musemind | 2022
                </div>

            </div>
        </footer >
    )
}

export default Index