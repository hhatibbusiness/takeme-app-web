import React, { useEffect } from 'react';
import Input from '../InputAdmin/Input';
import './PopupInput.css';
import getValueNestedObject from '../../utilty/getValueNestedObject';


const PopupInput = ({ selectedItem, displayName, placeholder, inputClickHandler, setOpen=()=>{} }) => {
    return (
        <div onClick={e => setOpen(true)} className='PopupInput'>
            <div className='PopupInput__contianer'>
                <Input id={'PopupInput__input'} placeholder={placeholder} value={getValueNestedObject(selectedItem, displayName)} />
                <div className='PopupInput__arrow'>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
            </div>
            <div onClick={inputClickHandler} className='PopupInput__cover'></div>
        </div>
    )
}

export default PopupInput;