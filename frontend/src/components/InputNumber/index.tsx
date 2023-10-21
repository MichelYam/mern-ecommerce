import React, { useState } from 'react'
import "./style.css"

const Index = () => {
    const [count, setCount] = useState(1)

    const handleQuantityAmount = (value: number) => {
        console.log(value)
        if (value < 1) {
            setCount(1)
        } else if (value > 50) {
            setCount(50)
        } else {
            setCount(value)
        }
    }

    return (
        <span className="input-wrapper">
            <button id="decrement" onClick={() => setCount(count - 1)}>-</button>
            <input type="number" value={count} id="quantity" onChange={(e) => handleQuantityAmount(Number(e.target.value))} />
            <button id="increment" onClick={() => setCount(count + 1)}>+</button>
        </span>
    )
}

export default Index