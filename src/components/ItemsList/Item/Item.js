import React, { useState } from 'react';
import './Item.css';
import Dots from '../../Dots/Dots';
import { getHighlightedText } from '../../../utilty/getHighlightText';
import selectedImage from '../../../assets/defaults/checked.svg';
import unSelectedImage from '../../../assets/defaults/unselected.svg';
import _ from 'lodash';
import {useNavigate} from "react-router-dom";


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
    isSearching,
    clickable,
    link,
    hasSubName,
    subName,
}) => {
    const dotsPropsRegistered = dotsProps(item.id);
    const [selected, setSelected] = useState(false);

    const itemValue = `${hasSubName ? `(${_.get(item, subName)})` : ''} ${_.get(item, displayName)} `;
    const navigate = useNavigate();

    return (
        <div data-id={item.id} onClick={(e) => {
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
            } else if(clickable) {
                navigate(link(item.id));
            }
        }} className={`Item`}>
            <div className='Item__container'>
                {
                    select && !single && (
                        <div onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            setSelected(!selected);
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
                    <div className={`Item__name  ${(selectedItem?.id == item?.id && select && single ) || (select && !single && selected) ? 'Item__selected' : ''}`}>
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