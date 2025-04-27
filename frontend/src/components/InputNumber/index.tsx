import { ChangeEvent } from 'react'
import "./style.css"

interface Props {
    value: number
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Index = ({ value, onChange }: Props) => {

    const handleDecrement = () => {
        const event = { target: { value: (value - 1).toString() } } as ChangeEvent<HTMLInputElement>;
        onChange(event);
    }

    const handleIncrement = () => {
        const event = { target: { value: (value + 1).toString() } } as ChangeEvent<HTMLInputElement>;
        onChange(event);
    }
    return (
        <span className="input-wrapper">
            <button id="decrement" onClick={handleDecrement}>-</button>
            <input type="number" value={value} id="quantity" onChange={onChange} />
            <button id="increment" onClick={handleIncrement}>+</button>
        </span>
    )
}

export default Index