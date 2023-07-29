import React from 'react';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import './PhoneVerify.scss';

const PhoneVerify = ({phone, step, setStep}) => {
    const {t} = useTranslation();
    return (
        <div className={'PhoneVerify'}>
            <div className="PhoneVerify__icon">
                <i className="fa-solid fa-mobile-screen-button"></i>
                <p className="PhoneVerify__text">
                    <span className="PhoneVerify__text--text">{t('verify phone')}</span>
                    <span className="PhoneVerify__text--num">{phone}</span>
                </p>
            </div>
            <div className="PhoneVerify__inputs">
                <input type="text" className="PhoneVerify__input"/>
                <input type="text" className="PhoneVerify__input"/>
                <input type="text" className="PhoneVerify__input"/>
                <input type="text" className="PhoneVerify__input"/>
            </div>
            <div className="Register__form--element">
                <button className="Register__form--button" onClick={e => setStep(step + 1)}>{t('verify')}</button>
                <p className="Register__form--register">{t('create')}?<NavLink className={'Register__form--register-link'} to={'/register'}>{t('registerlogin')}</NavLink></p>
            </div>
        </div>
    );
};

export default PhoneVerify;