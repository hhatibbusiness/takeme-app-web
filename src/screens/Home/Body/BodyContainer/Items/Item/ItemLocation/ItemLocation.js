import React from 'react';
import './ItemLocation.css';

const ItemLocation = ({item}) => {
    return (
        <div className={'ItemLocation'}>
            <i className="fa-solid fa-location-dot"></i>
            <p>{item?.provider?.country}</p>
        </div>
    );
};

export default ItemLocation;