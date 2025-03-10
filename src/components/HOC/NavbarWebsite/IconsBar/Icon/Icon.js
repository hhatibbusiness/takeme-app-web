import React from 'react';
import './Icon.css';

const Icon = ({iconData}) => {
    return (
        <div className={`Icon ${iconData.disabled ? 'Icon_disabled' : ''} ${iconData.active ? 'Icon__active': ''}`} onClick={iconData.iconClickHandler}>
            {iconData.icon}
        </div>
    );
};

export default Icon;