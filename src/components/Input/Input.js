import React from 'react';
import {useTranslation} from "react-i18next";
import './Input.css';

const Input = ({
    value,
    onChange,
    inputActive,
    setInputActive,
    locale,
    type,
    name
}) => {
    const { t } = useTranslation();
    
    return (
        <div className="InputAdmin">
            <div className="Input__wraper">
                <label
                    htmlFor="phone"
                    className={`Input__label ${(inputActive || value?.value?.length > 0) && 'Input__label--active'}`}
                >
                    {t(locale)}
                    <span className='Input__reguired'>*</span>
                </label>
                <input
                    onChange={onChange}
                    value={value?.value}
                    onBlur={e => value?.value.length === 0 && setInputActive(false)}
                    onFocus={e => setInputActive(true)}
                    name={name}
                    type={type}
                    className={`Input__element-input Input__element-inputPhone ${!value?.valid && value?.touched && 'Input__element-inValid'}`}
                />
            </div>
        </div>
    );
};

export default Input;