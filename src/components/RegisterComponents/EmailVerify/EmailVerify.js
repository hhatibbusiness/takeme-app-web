import React from 'react';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import './EmailVerify.scss';

const PhoneVerify = ({phone, step, setStep, email, form}) => {
    const {t} = useTranslation();
    return (
        <div className={'PhoneVerify'}>
            <div className="PhoneVerify__icon">
            <i class="fa-solid fa-envelope"></i>
                <p className="PhoneVerify__text">
                    <span className="PhoneVerify__text--text">{t('verify phone')}</span>
                    <span className="PhoneVerify__text--num">{form.email.value}</span>
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