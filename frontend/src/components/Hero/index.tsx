import React from 'react'
import hero from "../../assets/img/hero.png"
import './style.css'

const index = () => {
  return (
    <div className="hero">
      <div className='hero-content'>
        <p>Grab Upto 50% Off On Selected HeadPhone</p>
        <button className='hero-btn'>Buy Now</button>
      </div>
      <div className='hero-img'>
        <img src={hero} alt="hero" />
      </div>
    </div>
  )
}

export default index