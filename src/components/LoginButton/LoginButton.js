import React from 'react';
import './LoginButton.css';

const LoginButton = ({
    value,
    icon,
    backColor,
    color,
    borderColor,
    separatorColor,
    fontWeight,
    clickFun
}) => {
    return (
        <div onClick={clickFun} className='LoginButton' style={{background: `${backColor}`, color: `${color}`, border: `1px solid ${borderColor}`}}>
            <img src={icon} className='LoginButton__icon' />
            <div className='LoginButton__separator' style={{background: `${separatorColor}`}}></div>
            <div className='LoginButton__text' style={{ fontWeight: `${fontWeight}`}}>
                <p>{value}</p>
            </div>
        </div>
    )
}

export default LoginButton;