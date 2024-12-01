import React from 'react';
import './Icon.css';

const Icon = ({icon, disabled, mouseDownFunc, mouseUp, eyeOpen, store, personActive, setEyeOpen, filtersActive, setFiltersActive, iconClickHandler , viewOpen}) => {
    return (
        <div onMouseDown={mouseDownFunc} onTouchStart={mouseDownFunc} onTouchEnd={mouseUp} onMouseUp={mouseUp} className={`Icon ${disabled ? 'Icon_disabled' : ''} ${((viewOpen && store)  || filtersActive || personActive) ? 'Icon__active': ''}`} onClick={iconClickHandler}>
            {icon}
        </div>
    );
};

export default Icon;