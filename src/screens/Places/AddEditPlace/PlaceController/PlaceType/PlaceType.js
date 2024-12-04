import React, { useState, useRef, useEffect } from 'react';
import './PlaceType.css';

const PlaceType = ({ options, value, onChange, width, height, margin, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="placeTypeElementContainer"
            ref={dropdownRef}
            style={{ width: width, height: height, margin: margin }}
        >
            <div className="placeTypeElementContainer__selected" onClick={handleToggle}>
                {value || placeholder}
            </div>
            {isOpen && (
                <div className="placeTypeElementContainer__options">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="placeTypeElementContainer__option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlaceType;