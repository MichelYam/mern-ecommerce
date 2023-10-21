import React, { useState } from 'react';
import './style.css';


interface DropdownMenuProps {
    options: any;
    onSelect: (option: string) => void;
    title: string
}
const Index: React.FC<DropdownMenuProps> = ({ options, onSelect, title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-menu">
            <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption || title}
            </button>
            {isOpen && (
                <ul className="dropdown-options">
                    {options.map((option: any) => (
                        <li
                            key={option}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Index;