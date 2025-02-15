import React, {useRef, useState} from 'react';
import './Input.css';
import InputError from './InputError/InputError';

const Input = ({id, placeholder, disabled, submitted, required, value, setValue, touched, rules, valid }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className='Input__container'>
            <div className="Input__container--container">
                <label className={`Input__label ${(focused || value) ? 'Input__label--focused' : ''}`}>{placeholder}</label>
                <input
                    onFocus={e => {
                        setFocused(true);
                    }}
                    onBlur={e => {
                        setFocused(false);
                    }}
                    id={id} disabled={disabled} value={value} required={required} onChange={e => setValue(e.target.value)} className={`Input ${submitted && !valid ? "Input__invalid" : ''}`} />
            </div>
            <InputError touched={touched} submitted={submitted} rules={rules} valid={valid} />
        </div>
    )
}

export default Input;