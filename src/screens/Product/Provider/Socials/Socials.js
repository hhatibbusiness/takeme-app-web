import React from 'react';
import './Socials.scss';

const Socials = () => {
    return (
        <div className={'Socials'}>
            <div className="Socials__link"><i className="fa-brands fa-telegram"></i></div>
            <div className="Socials__link"><i className="fa-brands fa-whatsapp"></i></div>
            <div className="Socials__link"><i className="fa-solid fa-phone"></i></div>
        </div>
    );
};

export default Socials;