import React, { useEffect } from 'react';
import ItemsList from '../../components/ItemsList/ItemsList';
import Input from '../InputAdmin/Input';
import './PopupInput.css';

const PopupInput = ({ selectedItem, displayName, placeholder, inputClickHandler }) => {
    return (
        <div className='PopupInput'>
            <div className='PopupInput__contianer'>
                <Input disabled={true} placeholder={placeholder} value={selectedItem[displayName]} />
                <div className='PopupInput__arrow'>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
            </div>
            <div onClick={inputClickHandler} className='PopupInput__cover'></div>
        </div>
    )
}

export default PopupInput;