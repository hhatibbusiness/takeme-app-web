import React from 'react';
import './Icon.css';

const Icon = ({icon, disabled, eyeOpen, setEyeOpen, filtersActive, setFiltersActive, iconClickHandler , viewOpen}) => {
    return (
        <div className={`Icon ${disabled ? 'Icon_disabled' : ''} ${(viewOpen || filtersActive) ? 'Icon__active': ''}`} onClick={iconClickHandler}>
            {icon}
        </div>
    );
};

export default Icon;