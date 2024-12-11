import React, { useState } from 'react';
import './Item.css';
import Dots from '../../Dots/Dots';
import { getHighlightedText } from '../../../utilty/getHighlightText';
import selectedImage from '../../../assets/defaults/checked.svg';
import unSelectedImage from '../../../assets/defaults/unselected.svg';

const Item = ({
    item,
    dots,
    select,
    multiSelectFun,
    single,
    closePopup,
    selectedItem,
    itemClickFun,
    displayName,
    searchKey,
    dotsProps,
    isSearching
}) => {

    const dotsPropsRegistered = dotsProps(item.id);
    const [selected, setSelected] = useState(false);

    function getValueFromNestedObject(object, keyPath) {
        return keyPath.split('.').reduce((current, key) => {
            // If current value is an array, loop through it
            if (Array.isArray(current)) {
                for (let item of current) {
                    const value = item?.[key];
                    if (value !== undefined) {
                        return value;
                    }
                }
                return undefined;
            }
            return current?.[key];
        }, object);
    }
    
    const itemValue = getValueFromNestedObject(item, displayName);
    
    return (
        <div onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (itemClickFun) {
                if (single) {
                    itemClickFun(item);
                    closePopup();                                    
                } else {
                    setSelected(!selected);
                    multiSelectFun(item);
                }
            }
        }} className={`Item`}>
            <div className='Item__container'>
                {
                    select && !single && (
                        <div onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            setSelected(!selected)
                        }} className='Item__select--box'>
                            {
                                selected ? (
                                    <img src={selectedImage} />
                                ) : (
                                    <img src={unSelectedImage} />
                                )
                            }
                        </div>
                    )
                }
                <div className='Item__details'>
                    <div className={`'Item__name'  ${(selectedItem?.id == item?.id && select && single ) || (select && !single && selected) ? 'Item__selected' : ''}`}>
                        {
                            isSearching ? (
                                getHighlightedText(itemValue || '', searchKey)
                            ) : (
                                itemValue
                            )
                        }
                    </div>
                    {
                        dots && (
                            <Dots {...dotsPropsRegistered}/>
                        )
                    }
                </div>
            </div>
            <div className='Item__separator'></div>
        </div>
    )
}

export default Item;