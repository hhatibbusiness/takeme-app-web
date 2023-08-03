import React, { useState } from 'react';
import './UserDetails.scss';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import Spinner from '../../../components/Spinner/Spinner.Component'

const UserDetails = ({setStep, step, phoneActive, setPhoneActive, confirmPasswordActive, setConfirmPasswordActive, setUsernameActive, usernameActive, passwordActive, setPasswordActive, email, setEmail, emailActive, setEmailActive, form, setForm, setIsValid, isValid}) => {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const {t} = useTranslation();

    const handleInputValidation = (value, rules) => {
        let inputIsValid = true;
        if(!rules) {
            return true;
        }
        if(rules.isEmail) {
            inputIsValid = String(value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) && inputIsValid;
            console.log(inputIsValid);
        }
        if(rules.required) {
            inputIsValid = value.trim() !== '' && inputIsValid;
        }
        if(rules.match) {
            console.log(form.password.value, value);
            inputIsValid = form.password.value === value && inputIsValid
        }

        return inputIsValid; 
    }

    const handleInputChange = async (e, input) => {
        const formData = {
            ...form
        };
        const changedInputData = {
            ...formData[input.name]
        };
        changedInputData.value = e.target.value;
        changedInputData.touched = true;
        changedInputData.valid = handleInputValidation(changedInputData.value, changedInputData.rules, form);
        formData[input.name] = changedInputData;
        let formIsValid = true
        for(let inputKey in formData) {
            formIsValid = formData[inputKey].valid && formIsValid;
        }
        setForm(formData);
        setIsValid(formIsValid);

    }

    return (
        <div className={'UserDetails'}>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="username" className={`Register__form--element-label ${(usernameActive || form.username.value.length > 0) && 'Register__form--element-label-active'}`}>{t('username')}<span className='Register__reguired'>*</span></label>
                    <input value={form.username.value} onChange={e => {
                        handleInputChange(e, form.username);
                    }} onBlur={e => form.username.value.length === 0 && setUsernameActive(false)} onFocus={e => setUsernameActive(true)} name={'username'} type="text" className={`Register__form--element-input Register__form--element-inputPhone ${(form['username'].touched && form['username'].valid === false) && 'Register__element--input-notvalid'}`}/>
                </div>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="phone" className={`Register__form--element-label ${(phoneActive || form.phone.value.length > 0) && 'Register__form--element-label-active'}`}>{t('phone')}<span className='Register__reguired'>*</span></label>
                    <input value={form.phone.value} onChange={e => {
                        handleInputChange(e, form.phone)
                    }} onBlur={e => form.phone.value.length === 0 && setPhoneActive(false)} onFocus={e => setPhoneActive(true)} name={'phone'} type="tel" className={`Register__form--element-input Register__form--element-inputPhone ${(form['phone'].touched && !form['phone'].valid) && 'Register__element--input-notvalid'}`} />
                </div>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="email" className={`Register__form--element-label ${(emailActive || form.email.value.length > 0) && 'Register__form--element-label-active'}`}>{t('email')}<span className='Register__reguired'>*</span></label>
                    <input value={form.email.value} onChange={e => {
                        handleInputChange(e, form.email)
                    }} onBlur={e => form.email.value.length === 0 && setEmailActive(false)} onFocus={e => setEmailActive(true)} name={'phone'} type="text" className={`Register__form--element-input Register__form--element-inputPhone ${(form['email'].touched && !form['email'].valid) && 'Register__element--input-notvalid'}`} />
                </div>        
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="password" className={`Register__form--element-label ${(passwordActive || form.password.value.length > 0) && 'Register__form--element-label-active'}`}>{t('password')}<span className='Register__reguired'>*</span></label>
                    <input value={form.password.value} onChange={e => {
                        if(e.target.value === form.confirmPassword.value) {
                            setForm({
                                ...form,
                                confirmPassword: {
                                    ...form.confirmPassword,
                                    valid: true
                                },
                                password: {
                                    ...form.password,
                                    value: e.target.value,
                                    touched: true,
                                    valid: e.target.value.length > 0
                                }
                            });
                            let formIsValid = true
                            for(let inputKey in form) {
                                formIsValid = form[inputKey].valid && formIsValid;
                            }
                            setIsValid(formIsValid);
                        }else {
                            return setForm({
                                ...form,
                                confirmPassword: {
                                    ...form.confirmPassword,
                                    valid: false
                                },
                                password: {
                                    ...form.password,
                                    value: e.target.value,
                                    valid: e.target.value.length > 0,
                                    touched: true
                                }
                            })
                        }
                    }} name={'password'} onBlur={e => form.password.value.length === 0 && setPasswordActive(false)} onFocus={e => setPasswordActive(true)} type="password" className={`Register__form--element-input Register__form--element-inputPhone ${(form['password'].touched && form['password'].valid === false) && 'Register__element--input-notvalid'}`}/>
                </div>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="confirmPassword" className={`Register__form--element-label ${(confirmPasswordActive || form.confirmPassword.value.length > 0) && 'Register__form--element-label-active'}`}>{t('confirmPassword')}<span className='Register__reguired'>*</span></label>
                    <input value={form.confirmPassword.value} onChange={e => {
                        handleInputChange(e, form.confirmPassword);
                    }} name={'confirmPassword'} onBlur={e => form.confirmPassword.value.length === 0 && setConfirmPasswordActive(false)} onFocus={e => setConfirmPasswordActive(true)} type="password" className={`Register__form--element-input Register__form--element-inputPhone ${(form['confirmPassword'].touched && form['confirmPassword'].valid === false) && 'Register__element--input-notvalid'}`}/>
                </div>
            </div>
            <div className="Register__form--element">
                <button className="Register__form--button" onClick={async e => {
                    e.preventDefault();
                    if(step + 1 == 2 && !isValid) return;
                    setStep(step + 1);
                }}>
                    {
                        sending ? (
                            <Spinner />
                        ) : (
                            <span>{t('next')}</span>
                        )
                    }
                </button>
                <p className="Register__form--register">{t('create')}?<NavLink className={'Register__form--register-link'} to={'/login'}>{t('registerlogin')}</NavLink></p>
            </div>
        </div>
    );
};

export default UserDetails;