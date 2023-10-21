import React from 'react'
import jwt_decode from 'jwt-decode';
import { ProductData, cartData, useGetProductByIdQuery, useGetUserCartQuery } from '../../service/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import './style.css'



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Index = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const token = localStorage.getItem('token')

    let decodedToken: any = {}
    if (token !== null) {
        decodedToken = jwt_decode(token);
    }
    const { data: cart } = useGetUserCartQuery<cartData>(decodedToken.sub);

    const Product = ({ id, quantity }: any) => {
        const { data: product } = useGetProductByIdQuery<ProductData>(id)
        return (
            <div className='checkout-review-info flex'>
                <div style={{ gap: "35px", alignItems: "center" }} className='flex'>
                    <div className='checkout-review-info-img'>
                        <img src={product?.image} alt="esff" />
                    </div>
                    <div className='product-checkout-title'>
                        <h3>{product?.title}</h3>
                        <p>Color: Pink</p>
                    </div>
                </div>
                <div className='checkout-product-price'>
                    <p>${product?.price}</p>
                    <p>Quantity: {quantity}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='checkout'>
            <div className='checkout-product'>
                <div className='checkout-review box'>
                    <h2>Review Item And Shipping</h2>
                    {cart && cart.map((item: any) => {
                        return item.products.map((ele: { productId: number, quantity: number }) => {
                            return <Product key={ele.productId} id={ele.productId} quantity={ele.quantity} />
                        })
                    })}
                </div>
                <div className='checkout-delivery box'>
                    <div className='checkout-delivery-title'>
                        <h2>Delivery Information</h2>
                        <button>Edit Information</button>
                    </div>
                    <div className='checkout-delivery-information'>
                        <p>Name:</p>
                        <p>Wade Warren</p>
                    </div>
                    <div className='checkout-delivery-information'>
                        <p>Address:</p>
                        <p>4140 Parker Rd. Allentown, New Mexico 31134</p>
                    </div>
                    <div className='checkout-delivery-information'>
                        <p>City:</p>
                        <p>Austin</p>
                    </div>
                    <div className='checkout-delivery-information'>
                        <p>Zip Code:</p>
                        <p>85486</p>
                    </div>
                    <div className='checkout-delivery-information'>
                        <p>Mobile:</p>
                        <p>+447700960054</p>
                    </div>
                    <div className='checkout-delivery-information'>
                        <p>Email:</p>
                        <p>georginia.young@example.com</p>
                    </div>

                </div>
            </div>
            <div className='checkout-payments box'>
                <h2>Order Summery</h2>
                <hr />
                <div className='coupon'>
                    <input type="text" id="coupon" placeholder='Enter Coupon Code' />
                    <button>Apply coupon</button>
                </div>
                <hr />
                <h3>Payment Details</h3>
                <hr />
                <div className='checkout-payments-option'>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
                            <FormControlLabel value="shopcartCard" control={<Radio />} label="Shopcart Card" />
                            <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
                            <FormControlLabel value="creditCard" control={<Radio />} label="Credit or Debit card" />
                        </RadioGroup>
                    </FormControl>
                    <div className='control-input'>
                        <label htmlFor="">Email*</label>
                        <input type="text" placeholder='Type here...' />
                    </div>
                    <div className='control-input'>
                        <label htmlFor="">Card Holder Name*</label>
                        <input type="text" placeholder='Type here...' />
                    </div>
                    <div className='control-input'>
                        <label htmlFor="">Card Number*</label>
                        <input type="text" placeholder='0000******1245' />
                    </div>
                    <div className='control-input-row flex'>
                        <div className='control-input'>
                            <label htmlFor="">Expiry</label>
                            <input type="text" placeholder='MM/YY' />
                        </div>
                        <div className='control-input'>
                            <label htmlFor="">CVC</label>
                            <input type="number" placeholder='000' />
                        </div>
                    </div>
                    <div className='checkout-recipe'>
                        <p>Sub Total</p>
                        <p>$549.00</p>
                    </div>
                    <div className='checkout-recipe'>
                        <p>Tax(10%)</p>
                        <p>$54.90</p>
                    </div>
                    <div className='checkout-recipe'>
                        <p>Coupon Discount</p>
                        <p>-$54.90</p>
                    </div>
                    <div className='checkout-recipe'>
                        <p>Shipping Cost</p>
                        <p>-$0.00</p>
                    </div>
                    <hr />
                    <div className='checkout-recipe'>
                        <p>Sub Total</p>
                        <p>$549.00</p>
                    </div>
                    {/* <button className='checkout-btn'>Pay $494.10</button> */}
                    <Button sx={{
                        borderRadius: 50,
                        background: "#003a24",
                        color: "#ffffff",
                        height: "50px",
                        ":hover": {
                            boxShadow: 'none',
                            backgroundColor: '#3c52b2',
                        }
                    }} onClick={handleOpen}>Pay $494.10</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <BsFillCheckCircleFill style={{ color: "#04ac05" }} />
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                You order has been accepted
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Transection ID: 8984294820
                            </Typography>
                            <Link to="/">
                                <Button onClick={handleClose}>Continue Shopping</Button>
                            </Link>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div >
    )
}

export default Index