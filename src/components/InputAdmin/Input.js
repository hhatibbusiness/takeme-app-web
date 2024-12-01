import React from 'react';
import './Input.css';
import InputError from './InputError/InputError';

const Input = ({ placeholder, disabled, submitted, required, value, setValue, touched, rules, valid }) => {
    
    return (
        <div className='Input__container'>
            <input disabled={disabled} value={value} required={required} onChange={e => setValue(e.target.value)} placeholder={placeholder} className={`Input ${submitted && !valid ? "Input__invalid" : ''}`} />
            <InputError touched={touched} submitted={submitted} rules={rules} valid={valid} />
        </div>
    )
}

export default Input;