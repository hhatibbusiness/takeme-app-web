import React from 'react';
import './UserDetails.scss';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";

const UserDetails = ({phone, setPhone, username, setUserName, confirmPassword, setConfirmPassword, password, setPassword, setStep, step, phoneActive, setPhoneActive, confirmPasswordActive, setConfirmPasswordActive, setUsernameActive, usernameActive, passwordActive, setPasswordActive}) => {
    const {t} = useTranslation();
    return (
        <div className={'UserDetails'}>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="phone" className={`Register__form--element-label ${(usernameActive || username.length > 0) && 'Register__form--element-label-active'}`}>{t('phone')}</label>
                    <input value={username} onChange={e => {
                        setUserName(e.target.value);
                    }} onBlur={e => username.length === 0 && setUsernameActive(false)} onFocus={e => setUsernameActive(true)} name={'phone'} type="text" className="Register__form--element-input" />
                </div>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="phone" className={`Register__form--element-label ${(phoneActive || phone.length > 0) && 'Register__form--element-label-active'}`}>{t('phone')}</label>
                    <input value={phone} onChange={e => {
                        setPhone(e.target.value)
                    }} onBlur={e => phone.length === 0 && setPhoneActive(false)} onFocus={e => setPhoneActive(true)} name={'phone'} type="text" className="Register__form--element-input" />
                </div>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="phone" className={`Register__form--element-label ${(passwordActive || password.length > 0) && 'Register__form--element-label-active'}`}>{t('password')}</label>
                    <input value={password} onChange={e => {
                        setPassword(e.target.value);
                    }} name={'phone'} onBlur={e => password.length === 0 && setPasswordActive(false)} onFocus={e => setPasswordActive(true)} type="password" className="Register__form--element-input Register__form--element-inputPhone"/>
                </div>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="phone" className={`Register__form--element-label ${(confirmPasswordActive || confirmPassword.length > 0) && 'Register__form--element-label-active'}`}>{t('password')}</label>
                    <input value={confirmPassword} onChange={e => {
                        setConfirmPassword(e.target.value);
                    }} name={'phone'} onBlur={e => confirmPassword.length === 0 && setConfirmPasswordActive(false)} onFocus={e => setConfirmPasswordActive(true)} type="password" className="Register__form--element-input Register__form--element-inputPhone"/>
                </div>
            </div>
            <div className="Register__form--element">
                <button className="Register__form--button" onClick={e => setStep(step + 1)}>{t('next')}</button>
                <p className="Register__form--register">{t('create')}?<NavLink className={'Register__form--register-link'} to={'/login'}>{t('registerlogin')}</NavLink></p>
            </div>
        </div>
    );
};

export default UserDetails;