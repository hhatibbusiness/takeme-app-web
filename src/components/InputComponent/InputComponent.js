import React, { useEffect, useState } from 'react';
import './InputComponent.css';
import invisibleImage from '../../assets/images/defaults/invisible.png';

const InputComponent = ({ icon, type, placeholder, value, setValue }) => {
    const [inputType, setInputType] = useState('');

    useEffect(() => {
        setInputType(type);
    }, [type])

    return (
        <div className='InputComponent'>
            <img
                className='InputComponent__icon'
                src={icon}
            />
            <input
                value={value}
                onChange={e => {
                    setValue(e.target.value)
                }}
                placeholder={placeholder}
                type={inputType}
            />
            {
                type == 'password' && (
                    <img
                        onClick={e => {
                            setInputType(t => {
                                return t == 'text' ? 'password' : 'text'
                            })
                        }}
                        className='InputComponent__password'
                        src={invisibleImage}
                    />
                )
            }
        </div>
    )
}

export default InputComponent;