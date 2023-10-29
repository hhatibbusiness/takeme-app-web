// import React, { useState } from 'react';
// import './UserDetails.scss';
// import {useTranslation} from "react-i18next";
// import {NavLink} from "react-router-dom";
// import Spinner from '../../../components/Spinner/Spinner.Component';
// import {registerError} from "../../../store/actions/register.actions";
// import {connect} from "react-redux";
//
// const UserDetails = ({setStep, step, phoneActive, phoneCountryCodeActive, setPhoneCountryCodeActive, registerError, setPhoneActive, confirmPasswordActive, setConfirmPasswordActive, setUsernameActive, usernameActive, passwordActive, setPasswordActive, email, setEmail, emailActive, setEmailActive, form, setForm, setIsValid, isValid}) => {
//     const [sending, setSending] = useState(false);
//     const [sent, setSent] = useState(false);
//     const [formIsValid, setFormIsValid] = useState(false);
//     const {t} = useTranslation();
//     const [passwordType, setPasswordType] = useState(true);
//     const [confirmedType, setConfirmedType] = useState(true);
//
//     const handleInputValidation = (value, rules) => {
//         let inputIsValid = true;
//         if(!rules) {
//             return true;
//         }
//         if(rules.isEmail) {
//             inputIsValid = String(value)
//             .toLowerCase()
//             .match(
//                 /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//             ) && inputIsValid;
//             console.log(inputIsValid);
//         }
//         if(rules.isNumber) {
//             inputIsValid = !isNaN(value) && inputIsValid;
//         }
//         if(rules.required) {
//             inputIsValid = value.trim() !== '' && inputIsValid;
//         }
//         if(rules.fraction) {
//             console.log()
//             inputIsValid = Number.isInteger(Number(value)) && inputIsValid;
//             // inputIsValid = true;
//         }
//         if(rules.match) {
//             console.log(form.password.value, value);
//             inputIsValid = form.password.value === value && inputIsValid
//         }
//         if(rules.minLength) {
//             inputIsValid = value.length >= rules.minLength && inputIsValid;
//         }
//
//         return inputIsValid;
//     }
//
//     const handleInputChange = async (e, input) => {
//         const formData = {
//             ...form
//         };
//         const changedInputData = {
//             ...formData[input.name]
//         };
//         changedInputData.value = e.target.value;
//         changedInputData.touched = true;
//         changedInputData.valid = handleInputValidation(changedInputData.value, changedInputData.rules, form);
//         formData[input.name] = changedInputData;
//         let formIsValid = true
//         for(let inputKey in formData) {
//             formIsValid = formData[inputKey].valid && formIsValid;
//         }
//         setForm(formData);
//         setIsValid(formIsValid);
//
//     }
//
//     return (
//         <div className={'UserDetails'}>
//             <div className="Register__form--element">
//                 <div className="Register__form--element-wrapper">
//                     <label htmlFor="username" className={`Register__form--element-label ${(usernameActive || form.username.value.length > 0) && 'Register__form--element-label-active'}`}>{t('username')}<span className='Register__reguired'>*</span></label>
//                     <input value={form.username.value} onChange={e => {
//                         handleInputChange(e, form.username);
//                     }} onBlur={e => form.username.value.length === 0 && setUsernameActive(false)} onFocus={e => setUsernameActive(true)} name={'username'} type="text" className={`Register__form--element-input Register__form--element-inputPhone ${(form['username'].touched && form['username'].valid === false) && 'Register__element--input-notvalid'}`}/>
//                 </div>
//             </div>
//             <div className="Register__form--element">
//                 <div className="Register__form--element-wrapper">
//                     <label htmlFor="phone" className={`Register__form--element-label ${(phoneCountryCodeActive || form.phoneCountryCode.value.length > 0) && 'Register__form--element-label-active'}`}>{t('phoneCountryCode')}<span className='Register__reguired'>*</span></label>
//                     <input value={form.phoneCountryCode.value} onChange={e => {
//                         handleInputChange(e, form.phoneCountryCode)
//                     }} onBlur={e => form.phoneCountryCode.value.length === 0 && setPhoneCountryCodeActive(false)} onFocus={e => setPhoneCountryCodeActive(true)} name={'phone'} type="tel" className={`Register__form--element-input Register__form--element-inputPhone ${(form['phoneCountryCode'].touched && !form['phoneCountryCode'].valid) && 'Register__element--input-notvalid'}`} />
//                 </div>
//             </div>
//             <div className="Register__form--element">
//                 <div className="Register__form--element-wrapper">
//                     <label htmlFor="phone" className={`Register__form--element-label ${(phoneActive || form.phone.value.length > 0) && 'Register__form--element-label-active'}`}>{t('phone')}<span className='Register__reguired'>*</span></label>
//                     <input value={form.phone.value} onChange={e => {
//                         handleInputChange(e, form.phone);
//                     }} onBlur={e => form.phone.value.length === 0 && setPhoneActive(false)} onFocus={e => setPhoneActive(true)} name={'phone'} type="tel" className={`Register__form--element-input Register__form--element-inputPhone ${(form['phone'].touched && !form['phone'].valid) && 'Register__element--input-notvalid'}`} />
//                 </div>
//             </div>
//
//             <div className="Register__form--element">
//                 <div className="Register__form--element-wrapper">
//                     <label htmlFor="email" className={`Register__form--element-label ${(emailActive || form.email.value.length > 0) && 'Register__form--element-label-active'}`}>{t('email')}<span className='Register__reguired'>*</span></label>
//                     <input value={form.email.value} onChange={e => {
//                         handleInputChange(e, form.email)
//                     }} onBlur={e => form.email.value.length === 0 && setEmailActive(false)} onFocus={e => setEmailActive(true)} name={'phone'} type="text" className={`Register__form--element-input Register__form--element-inputPhone ${(form['email'].touched && !form['email'].valid) && 'Register__element--input-notvalid'}`} />
//                 </div>
//             </div>
//             <div className="Register__form--element">
//                 <div className="Register__form--element-wrapper">
//                     <label htmlFor="password" className={`Register__form--element-label ${(passwordActive || form.password.value.length > 0) && 'Register__form--element-label-active'}`}>{t('password')}<span className='Register__reguired'>*</span></label>
//                     <input value={form.password.value} onChange={e => {
//                         if(e.target.value === form.confirmPassword.value) {
//                             setForm({
//                                 ...form,
//                                 confirmPassword: {
//                                     ...form.confirmPassword,
//                                     valid: true
//                                 },
//                                 password: {
//                                     ...form.password,
//                                     value: e.target.value,
//                                     touched: true,
//                                     valid: e.target.value.length > 0
//                                 }
//                             });
//                             let formIsValid = true
//                             for(let inputKey in form) {
//                                 formIsValid = form[inputKey].valid && formIsValid;
//                             }
//                             setIsValid(formIsValid);
//                         }else {
//                             return setForm({
//                                 ...form,
//                                 confirmPassword: {
//                                     ...form.confirmPassword,
//                                     valid: false
//                                 },
//                                 password: {
//                                     ...form.password,
//                                     value: e.target.value,
//                                     valid: e.target.value.length > 6,
//                                     touched: true
//                                 }
//                             })
//                         }
//                     }} name={'password'}  onBlur={e => form.password.value.length === 0 && setPasswordActive(false)} onFocus={e => setPasswordActive(true)} type={
//                         passwordType ? 'password' : 'text'
//                     } className={`Register__form--element-input Register__form--element-inputPhone ${(form['password'].touched && form['password'].valid === false) && 'Register__element--input-notvalid'}`}/>
//                     <p onClick={e => setPasswordType(!passwordType)} className={'Register__form--eye'}>
//                         {
//                             passwordType ? (
//                                 <span><i className="fa-solid fa-eye Register__form--element-eye-see"></i></span>
//                             ) : (
//                                 <span><i className="fa-solid fa-eye-slash Register__form--element-eye-unsee"></i></span>
//                             )
//                         }
//                     </p>
//                 </div>
//             </div>
//             <div className="Register__form--element">
//                 <div className="Register__form--element-wrapper">
//                     <label htmlFor="confirmPassword" className={`Register__form--element-label ${(confirmPasswordActive || form.confirmPassword.value.length > 0) && 'Register__form--element-label-active'}`}>{t('confirmPassword')}<span className='Register__reguired'>*</span></label>
//                     <input value={form.confirmPassword.value} onChange={e => {
//                         handleInputChange(e, form.confirmPassword);
//                     }} name={'confirmPassword'} onBlur={e => form.confirmPassword.value.length === 0 && setConfirmPasswordActive(false)} onFocus={e => setConfirmPasswordActive(true)} type={
//                         confirmedType ? 'password' : 'text'
//                     } className={`Register__form--element-input Register__form--element-inputPhone ${(form['confirmPassword'].touched && (form['confirmPassword'].valid == false || form['password'].valid == false)) && 'Register__element--input-notvalid'}`}/>
//                     <p onClick={e => setConfirmedType(!confirmedType)} className={'Register__form--eye'}>
//                         {
//                             confirmedType ? (
//                                 <span><i className="fa-solid fa-eye Register__form--element-eye-see"></i></span>
//                             ) : (
//                                 <span><i className="fa-solid fa-eye-slash Register__form--element-eye-unsee"></i></span>
//                             )
//                         }
//                     </p>
//                 </div>
//             </div>
//             <div className="Register__form--element">
//                 <button className="Register__form--button" onClick={async e => {
//                     e.preventDefault();
//                     setForm({
//                         ...form,
//                         username: {
//                             ...form.username,
//                             touched: true
//                         },
//                         phone: {
//                             ...form.phone,
//                             touched: true
//                         },
//                         email: {
//                             ...form.email,
//                             touched: true
//                         },
//                         password: {
//                             ...form.password,
//                             touched: true
//                         },
//                         confirmPassword: {
//                             ...form.confirmPassword,
//                             touched: true
//                         },
//                         phoneCountryCode: {
//                             ...form.phoneCountryCode,
//                             touched: true
//                         }
//                     });
//                     if(form.username.value.length == 0) return registerError(t('usernameerror'));
//                     if(form.phoneCountryCode.value.length == 0) return registerError(t('phoneCountryCodeُError'));
//                     if(form.phone.value.length == 0) return registerError(t('phoneerror'));
//                     if(form.email.value.length == 0) return registerError(t('emailerror'));
//                     if(form.password.value.length == 0) return registerError(t('passworderror'));
//                     if(form.confirmPassword.value.length == 0) return registerError(t('confirmpassworderror'));
//                     if(form.confirmPassword.value !== form.password.value) return registerError(t('passwordmatcherror'))
//                     console.log(step + 1 == 2 && !isValid);
//                     if(step + 1 == 2 && !isValid) return;
//                     console.log('Reached!')
//                     setStep(step + 1);
//                 }}>
//                     {
//                         sending ? (
//                             <Spinner />
//                         ) : (
//                             <span>{t('next')}</span>
//                         )
//                     }
//                 </button>
//                 <p className="Register__form--register">{t('create')}?<NavLink className={'Register__form--register-link'} to={'/login'}>{t('registerlogin')}</NavLink></p>
//             </div>
//         </div>
//     );
// };
//
// export default connect(null, {registerError}) (UserDetails);


import React, { useState } from 'react';
import './UserDetails.scss';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import Spinner from '../../../components/Spinner/Spinner.Component';
import {registerError} from "../../../store/actions/register.actions";
import {connect} from "react-redux";

const UserDetails = ({setStep, step, phoneActive, phoneCountryCodeActive, setPhoneCountryCodeActive, registerError, setPhoneActive, confirmPasswordActive, setConfirmPasswordActive, setUsernameActive, usernameActive, passwordActive, setPasswordActive, email, setEmail, emailActive, setEmailActive, form, setForm, setIsValid, isValid}) => {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const {t} = useTranslation();
    const [passwordType, setPasswordType] = useState(true);
    const [confirmedType, setConfirmedType] = useState(true);

    const handleInputValidation = (value, input, name) => {
        const inputCopy = JSON.parse(JSON.stringify(input));
        let inputIsValid = true;
        if(!input.rules) {
            return true;
        }
        if(input?.rules?.isEmail) {
            const isValidEmail = String(value)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            inputIsValid = isValidEmail && inputIsValid;
            isValidEmail ? (inputCopy.rules.isEmail.valid = true) : (inputCopy.rules.isEmail.valid = false);
            console.log(inputIsValid);
        }
        if(input?.rules?.isNumber) {
            inputIsValid = !isNaN(value) && inputIsValid;
            !isNaN(value) && (inputCopy.rules.isNumber.valid = true)
        }
        if(input.rules.required) {
            console.log(input);
            console.log(value.trim() !== '');
            inputIsValid = value.trim() !== '' && inputIsValid;
            (value.trim() !== '') ? (inputCopy.rules.required.valid = true) : (inputCopy.rules.required.valid = false);
        }
        if(input.rules.fraction) {
            console.log(typeof value);
            inputIsValid = Number.isInteger(Number(value)) && inputIsValid;
            (Number.isInteger(Number(value)) && value !== '') ? (inputCopy.rules.fraction.valid = true) : (inputCopy.rules.fraction.valid = false);
            // inputIsValid = true;
        }
        if(input.rules.match) {
            console.log(form.password.value, value);
            const match = form.password.value === value;
            inputIsValid = match && inputIsValid;
            if(match) {
                inputCopy.rules.match.valid = true;
                // setForm({
                //     ...form,
                //     password: {
                //         ...form.password,
                //         rules: {
                //             ...form.password.rules,
                //             passwordMatch: {
                //                 ...form.password.rules.passwordMatch,
                //                 valid: true
                //             }
                //         }
                //     }
                // });
            }else {
                inputCopy.rules.match.valid = false;
            }

        }
        if(input.rules.minLength) {
            console.log(input.rules.minLength.value);
            inputIsValid = value.length >= input.rules.minLength.value && inputIsValid;
            (value.length >= input.rules.minLength.value) ? (inputCopy.rules.minLength.valid = true) : (inputCopy.rules.minLength.valid = false);
        }

        inputCopy.valid = inputIsValid;

        return inputCopy;
    }

    const handleInputChange = (e, input) => {
        const formData = {
            ...form
        };
        let changedInputData = {
            ...formData[input.name]
        };
        console.log(input.name);
        changedInputData.value = e.target.value;
        changedInputData.touched = true;
        changedInputData = JSON.parse(JSON.stringify(handleInputValidation(changedInputData.value, changedInputData, input.name)));
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
                <p className={'Register__form--element-rules'}>
                    {
                        form['username'].touched && (
                            <ul>
                                {
                                    Object.keys(form['username'].rules).map((r, i) => (
                                        <li style={{color: `${form['username'].rules[r].valid ? 'green' : 'red'}`}}>{form['username'].rules[r].message}</li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </p>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="phone" className={`Register__form--element-label ${(phoneCountryCodeActive || form.phoneCountryCode.value.length > 0) && 'Register__form--element-label-active'}`}>{t('phoneCountryCode')}<span className='Register__reguired'>*</span></label>
                    <input value={form.phoneCountryCode.value} onChange={e => {
                        handleInputChange(e, form.phoneCountryCode)
                    }} onBlur={e => form.phoneCountryCode.value.length === 0 && setPhoneCountryCodeActive(false)} onFocus={e => setPhoneCountryCodeActive(true)} name={'phone'} type="tel" className={`Register__form--element-input Register__form--element-inputPhone ${(form['phoneCountryCode'].touched && !form['phoneCountryCode'].valid) && 'Register__element--input-notvalid'}`} />
                </div>
                <p className={'Register__form--element-rules'}>
                    {
                        form['phoneCountryCode'].touched && (
                            <ul>
                                {
                                    Object.keys(form['phoneCountryCode'].rules).map((r, i) => (
                                        <li style={{color: `${form['phoneCountryCode'].rules[r].valid ? 'green' : 'red'}`}}>{form['phoneCountryCode'].rules[r].message}</li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </p>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="phone" className={`Register__form--element-label ${(phoneActive || form.phone.value.length > 0) && 'Register__form--element-label-active'}`}>{t('phone')}<span className='Register__reguired'>*</span></label>
                    <input value={form.phone.value} onChange={e => {
                        handleInputChange(e, form.phone);
                    }} onBlur={e => form.phone.value.length === 0 && setPhoneActive(false)} onFocus={e => setPhoneActive(true)} name={'phone'} type="tel" className={`Register__form--element-input Register__form--element-inputPhone ${(form['phone'].touched && !form['phone'].valid) && 'Register__element--input-notvalid'}`} />
                </div>
                <p className={'Register__form--element-rules'}>
                    {
                        form['phone'].touched && (
                            <ul>
                                {
                                    Object.keys(form['phone'].rules).map((r, i) => (
                                        <li style={{color: `${form['phone'].rules[r].valid ? 'green' : 'red'}`}}>{form['phone'].rules[r].message}</li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </p>
            </div>

            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="email" className={`Register__form--element-label ${(emailActive || form.email.value.length > 0) && 'Register__form--element-label-active'}`}>{t('email')}<span className='Register__reguired'>*</span></label>
                    <input value={form.email.value} onChange={e => {
                        handleInputChange(e, form.email)
                    }} onBlur={e => form.email.value.length === 0 && setEmailActive(false)} onFocus={e => setEmailActive(true)} name={'phone'} type="text" className={`Register__form--element-input Register__form--element-inputPhone ${(form['email'].touched && !form['email'].valid) && 'Register__element--input-notvalid'}`} />
                </div>
                <p className={'Register__form--element-rules'}>
                    {
                        form['email'].touched && (
                            <ul>
                                {
                                    Object.keys(form['email'].rules).map((r, i) => (
                                        <li style={{color: `${form['email'].rules[r].valid ? 'green' : 'red'}`}}>{form['email'].rules[r].message}</li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </p>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="password" className={`Register__form--element-label ${(passwordActive || form.password.value.length > 0) && 'Register__form--element-label-active'}`}>{t('password')}<span className='Register__reguired'>*</span></label>
                    <input value={form.password.value} onChange={e => {
                        const input = form.password;
                        const formData = {
                            ...form
                        };
                        let changedInputData = {
                            ...formData[input.name]
                        };
                        console.log(input);
                        changedInputData.value = e.target.value;
                        changedInputData.touched = true;
                        changedInputData = JSON.parse(JSON.stringify(handleInputValidation(changedInputData.value, changedInputData, input.name)));

                        if(e.target.value === form.confirmPassword.value) {
                            // setForm({
                            //     ...form,
                            //     confirmPassword: {
                            //         ...form.confirmPassword,
                            //         valid: true
                            //     },
                            //     password: {
                            //         ...form.password,
                            //         value: e.target.value,
                            //         touched: true,
                            //         valid: e.target.value.length > 0,
                            //     }
                            // });
                            formData['confirmPassword'].rules.match.valid = true;
                            formData['confirmPassword'].valid = changedInputData.valid;
                            formData[input.name] = changedInputData;


                            let formIsValid = true
                            for(let inputKey in formData) {
                                formIsValid = formData[inputKey].valid && formIsValid;
                            }
                            console.log(formData);
                            setIsValid(formIsValid);
                            setForm(formData);
                        }else {
                            changedInputData.valid = e.target.value.length >= 6;
                            formData['confirmPassword'].valid = false;
                            formData['confirmPassword'].rules.match.valid = false;
                            formData[input.name] = changedInputData;


                            let formIsValid = true
                            for(let inputKey in formData) {
                                formIsValid = formData[inputKey].valid && formIsValid;
                            }
                            console.log(formData);
                            setIsValid(formIsValid);
                            setForm(formData);

                            // return setForm({
                            //     ...form,
                            //     confirmPassword: {
                            //         ...form.confirmPassword,
                            //         valid: false,
                            //         rules: {
                            //             ...form.confirmPassword.rules,
                            //             passwordMatch: {
                            //                 ...form.confirmPassword.rules.passwordMatch,
                            //                 valid: false
                            //             }
                            //         }
                            //     },
                            //     password: {
                            //         ...form.password,
                            //         value: e.target.value,
                            //         valid: e.target.value.length >= 6,
                            //
                            //         touched: true,
                            //         rules: {
                            //             ...form.password.rules,
                            //             required: {
                            //                 ...form.password.rules.required,
                            //                 valid: e.target.length > 0
                            //             },
                            //             passwordMatch: {
                            //                 ...form.password.rules.passwordMatch,
                            //                 valid: false
                            //             }
                            //         }
                            //     }
                            // })
                        }

                    }} name={'password'}  onBlur={e => form.password.value.length === 0 && setPasswordActive(false)} onFocus={e => setPasswordActive(true)} type={
                        passwordType ? 'password' : 'text'
                    } className={`Register__form--element-input Register__form--element-inputPhone ${(form['password'].touched && form['password'].valid === false) && 'Register__element--input-notvalid'}`}/>
                    <p onClick={e => setPasswordType(!passwordType)} className={'Register__form--eye'}>
                        {
                            passwordType ? (
                                <span><i className="fa-solid fa-eye Register__form--element-eye-see"></i></span>
                            ) : (
                                <span><i className="fa-solid fa-eye-slash Register__form--element-eye-unsee"></i></span>
                            )
                        }
                    </p>
                </div>
                <p className={'Register__form--element-rules'}>
                    {
                        form['password'].touched && (
                            <ul>
                                {
                                    Object.keys(form['password'].rules).map((r, i) => (
                                        <li style={{color: `${form['password'].rules[r].valid ? 'green' : 'red'}`}}>{form['password'].rules[r].message}</li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </p>
            </div>
            <div className="Register__form--element">
                <div className="Register__form--element-wrapper">
                    <label htmlFor="confirmPassword" className={`Register__form--element-label ${(confirmPasswordActive || form.confirmPassword.value.length > 0) && 'Register__form--element-label-active'}`}>{t('confirmPassword')}<span className='Register__reguired'>*</span></label>
                    <input value={form.confirmPassword.value} onChange={e => {
                        handleInputChange(e, form.confirmPassword);
                    }} name={'confirmPassword'} onBlur={e => form.confirmPassword.value.length === 0 && setConfirmPasswordActive(false)} onFocus={e => setConfirmPasswordActive(true)} type={
                        confirmedType ? 'password' : 'text'
                    } className={`Register__form--element-input Register__form--element-inputPhone ${(form['confirmPassword'].touched && (form['confirmPassword'].valid == false || form['password'].valid == false)) && 'Register__element--input-notvalid'}`}/>
                    <p onClick={e => setConfirmedType(!confirmedType)} className={'Register__form--eye'}>
                        {
                            confirmedType ? (
                                <span><i className="fa-solid fa-eye Register__form--element-eye-see"></i></span>
                            ) : (
                                <span><i className="fa-solid fa-eye-slash Register__form--element-eye-unsee"></i></span>
                            )
                        }
                    </p>
                </div>
                <p className={'Register__form--element-rules'}>
                    {
                        form['confirmPassword'].touched && (
                            <ul>
                                {
                                    Object.keys(form['confirmPassword'].rules).map((r, i) => (
                                        <li style={{color: `${form['confirmPassword'].rules[r].valid ? 'green' : 'red'}`}}>{form['confirmPassword'].rules[r].message}</li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </p>
            </div>
            <div className="Register__form--element">
                <button className="Register__form--button" onClick={async e => {
                    e.preventDefault();
                    setForm({
                        ...form,
                        username: {
                            ...form.username,
                            touched: true
                        },
                        phone: {
                            ...form.phone,
                            touched: true
                        },
                        email: {
                            ...form.email,
                            touched: true
                        },
                        password: {
                            ...form.password,
                            touched: true
                        },
                        confirmPassword: {
                            ...form.confirmPassword,
                            touched: true
                        },
                        phoneCountryCode: {
                            ...form.phoneCountryCode,
                            touched: true
                        }
                    });
                    if(form.username.value.length == 0) return registerError(t('usernameerror'));
                    if(form.phoneCountryCode.value.length == 0) return registerError(t('phoneCountryCodeُError'));
                    if(form.phone.value.length == 0) return registerError(t('phoneerror'));
                    if(form.email.value.length == 0) return registerError(t('emailerror'));
                    if(form.password.value.length == 0) return registerError(t('passworderror'));
                    if(form.confirmPassword.value.length == 0) return registerError(t('confirmpassworderror'));
                    if(form.confirmPassword.value !== form.password.value) return registerError(t('passwordmatcherror'))
                    console.log(step + 1 == 2 && !isValid);
                    if(step + 1 == 2 && !isValid) return;
                    console.log('Reached!')
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

export default connect(null, {registerError}) (UserDetails);