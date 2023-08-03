import React from 'react';
import {useTranslation} from "react-i18next";
import './Submit.scss';
import { Link, NavLink } from 'react-router-dom';

const Submit = ({email, setEmail, city, isValid, formIsValid, setFormIsValid, setCity, agree, setAgree, emailActive, setEmailActive, cityActive, setCityActive, form, setForm}) => {
    const {t} = useTranslation();
    return (
        <div className={'Submit'}>
            <div className='Register__form--element'>
                <div className="Register__form--element-wrapper">
                    <label htmlFor="city" className={`Register__form--element-label ${(cityActive || city.value.length > 0) && 'Register__form--element-label-active'}`}>{t('city')}</label>
                    <input value={city.value} onChange={e => {
                        setCity({
                                ...city,
                                value: e.target.value,
                                valid: e.target.value.length > 0,
                                touched: true
                        })
                    }} onBlur={e => {
                        city.value.length == 0 && setCityActive(false)
                    }} onFocus={e => setCityActive(true)} name={'city'} type="text" className={`Register__form--element-input ${(!city.valid && city.touched) && 'Register__element--input-notvalid' }`} />
                </div>
            </div>
            <div className='Register__form--element'>
                <div className="Register__form--element-wrapper Register__form--element-conditions">
                    <div className='Register__form--element-input--wrapper'>
                        <input value={agree} onChange={e => {
                            console.log(e);
                            if(e.target.checked) {
                                setAgree(true);
                            } else {
                                setAgree(false);
                            }
                            if(city.valid && e.target.checked && isValid) {
                                setFormIsValid(true)
                            }else {
                                setFormIsValid(false);
                            }
                        }}  name={'conditions'} type="checkbox" className="Register__form--element-input" />
                        <span></span>
                    </div>
                    <label htmlFor="conditions" className={''}>{t('aggree')} <Link to={'/contract'}>{t('condition')}</Link></label>
                </div>
            </div>
            <div className="Register__form--element">
                <button disabled={!agree} className="Register__form--button Register__form--button-submit">
                    {
                        false ? (
                            <i className="fa-solid fa-circle-notch"></i>
                        ) : (
                            <span>{t('register')}</span>
                        )
                    }
                </button>
                <p className="Register__form--register">{t('create')}?<NavLink className={'Register__form--register-link'} to={'/login'}>{t('registerlogin')}</NavLink></p>
            </div>

        </div>
    );
};

export default Submit;