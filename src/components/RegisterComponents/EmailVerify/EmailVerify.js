import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import './EmailVerify.scss';
import {connect} from "react-redux";
import SpinnerComponent from "../../Spinner/Spinner.Component";
import {registerError} from "../../../store/actions/register.actions";

const PhoneVerify = ({step, setStep, registerError, buttonText, buttonLink, form, sendCodeFun, sendingCode, lan, sendCodeToServerFun, sendingCodeToServer}) => {
    const [code1, setCode1] = useState({
        value: '',
        touched: false,
        valid: false,
        rules: {
            required: true
        }
    });
    const [code2, setCode2] = useState({
        value: '',
        touched: false,
        valid: false,
        rules: {
            required: true
        }
    });
    const [code3, setCode3] = useState({
        value: '',
        touched: false,
        valid: false,
        rules: {
            required: true
        }
    });
    const [code4, setCode4] = useState({
        value: '',
        touched: false,
        valid: false,
        rules: {
            required: true
        }
    });
    const [code5, setCode5] = useState({
        value: '',
        touched: false,
        valid: false,
        rules: {
            required: true
        }
    });
    const [code6, setCode6] = useState({
        value: '',
        touched: false,
        valid: false,
        rules: {
            require: true
        }
    });
    const {t} = useTranslation();
    const conRef = useRef();
    const input1Ref = useRef();
    const input2Ref = useRef();
    const input3Ref = useRef();
    const input4Ref = useRef();
    const input5Ref = useRef();
    const input6Ref = useRef();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        if(!conRef.current) return;
        // conRef.current.querySelector('.PhoneVerify__input').focus();
        const inputs = conRef.current.querySelectorAll('.PhoneVerify__input');
        inputs[code1.value.length].focus();
    }, [conRef]);
    useEffect(() => {
        if(!form.email && !params.email) {
            navigate('/login');
        } else {
            const data = {
                email: form.email.value || params.email,
                lan,
                setStep,
                navigate
            }
            sendCodeFun(data);
        }
    }, []);
    return (
        !sendingCode ? (
            <div className={'PhoneVerify'}>
                <div className="PhoneVerify__icon">
                    <i className="fa-solid fa-envelope"></i>
                    <p className="PhoneVerify__text">
                        <span className="PhoneVerify__text--text">{t('verify phone')}</span>
                        <span className="PhoneVerify__text--num">{form.email.value}</span>
                    </p>
                </div>
                <form ref={conRef} className="PhoneVerify__inputs">
                    <input ref={input1Ref} value={code1.value} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode1({
                            ...code1,
                            value: e.target.value,
                            touched: true,
                            valid: e.target.value.length == 1
                        });
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input2Ref?.current?.focus();
                        }
                    }} type="text" onKeyDown={e => {
                        if(e.key == "Backspace" && e.target.value.length == 0) {
                            e.target.blur();
                            input1Ref?.current?.focus();
                        }
                    }} className={`PhoneVerify__input ${(code1.valid == false && code1.touched == true) && 'Register__element--input-notvalid'}`}/>
                    <input ref={input2Ref} value={code2.value} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode2({
                            ...code2,
                            value: e.target.value,
                            valid: e.target.value.length == 1,
                            touched: true
                        });
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input3Ref?.current?.focus();
                        }else if(e.target.value.length == 0) {
                            e.target.blur();
                            input1Ref?.current?.focus();
                        }
                    }} type="text" onKeyDown={e => {
                        if(e.key == "Backspace" && e.target.value.length == 0) {
                            e.target.blur();
                            input1Ref?.current?.focus();
                        }
                    }} className={`PhoneVerify__input ${(!code2.valid && code2.touched) && 'Register__element--input-notvalid'}`}/>
                    <input ref={input3Ref} value={code3.value} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode3({
                            ...code3,
                            value: e.target.value,
                            touched: true,
                            valid: e.target.value.length == 1
                        });
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input4Ref?.current?.focus();
                        }else if(e.target.value.length == 0) {
                            e.target.blur();
                            input2Ref?.current?.focus();
                        }
                    }} type="text" onKeyDown={e => {
                        if(e.key == "Backspace" && e.target.value.length == 0) {
                            e.target.blur();
                            input2Ref?.current?.focus();
                        }
                    }} className={`PhoneVerify__input ${(!code2.valid && code2.touched) && 'Register__element--input-notvalid'}`}/>
                    <input ref={input4Ref} value={code4.value} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode4({
                            code4,
                            value: e.target.value,
                            touched: true,
                            valid: e.target.value.length == 1
                        });
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input5Ref?.current?.focus();
                        }else if(e.target.value.length == 0) {
                            e.target.blur();
                            input3Ref?.current?.focus();
                        }
                    }} type="text" onKeyDown={e => {
                        if(e.key == "Backspace" && e.target.value.length == 0) {
                            e.target.blur();
                            input3Ref?.current?.focus();
                        }
                    }} className={`PhoneVerify__input ${(!code3.valid && code3.touched) && 'Register__element--input-notvalid'}`}/>
                    <input ref={input5Ref} value={code5.value} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode5({
                            ...code5,
                            value: e.target.value,
                            touched: true,
                            valid: e.target.value.length == 1
                        });
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input6Ref?.current?.focus();
                        }else if(e.target.value.length == 0) {
                            e.target.blur();
                            input4Ref?.current?.focus();
                        }
                    }} type="text" onKeyDown={e => {
                        if(e.key == "Backspace" && e.target.value.length == 0) {
                            e.target.blur();
                            input4Ref?.current?.focus();
                        }
                    }} className={`PhoneVerify__input ${!code5.valid && code5.touched && 'Register__element--input-notvalid'}`}/>
                    <input ref={input6Ref} value={code6.value} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode6({
                            ...code6,
                            value: e.target.value,
                            touched: true,
                            valid: e.target.value.length == 1
                        });
                        if(e.target.value.length == 0) {
                            e.target.blur();
                            input5Ref?.current?.focus();
                        }
                    }} onKeyDown={e => {
                        if(e.key == "Backspace" && e.target.value.length == 0) {
                            e.target.blur();
                            input5Ref?.current?.focus();
                        }
                    }} type="text" className={`PhoneVerify__input ${(!code6.valid && code6.touched) && 'Register__element--input-notvalid'}`}/>
                </form>
                <div className="Register__form--element">
                    <button className="Register__form--button" onClick={async e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCode1({
                            ...code1,
                            touched: true
                        });
                        setCode2({
                            ...code2,
                            touched: true
                        });
                        setCode3({
                            ...code1,
                            touched: true
                        });
                        setCode4({
                            ...code4,
                            touched: true
                        });
                        setCode5({
                            ...code5,
                            touched: true
                        });
                        setCode6({
                            ...code6,
                            touched: true
                        })
                        if(code1.value.length == 0 || code2.value.length == 0 || code3.value.length == 0 || code4.value.length == 0 || code5.value.length == 0 || code6.value.length == 0) return registerError(t('requiredField'));
                        const data = {
                            email: form.email,
                            lan,
                            setStep,
                            code: `${code1.value}${code2.value}${code3.value}${code4.value}${code5.value}${code6.value}`
                        }
                        await sendCodeToServerFun(data);
                    }}>
                        {
                            sendingCodeToServer ? (
                                <i className="fa-solid fa-circle-notch"></i>
                            ) : (
                                <span>{t('verify')}</span>
                            )
                        }
                    </button>
                    <p className="Register__form--register">{t('create')}?<NavLink
                        className={'Register__form--register-link'} to={buttonLink}>{t(buttonText)}</NavLink></p>
                </div>
            </div>

        ) : (
            <SpinnerComponent />
        )
    );
};

const mapStateToProps = state => ({
    sendingCodeToCustomer: state.register.sendingCodeToCustomer
})

export default connect(mapStateToProps, {registerError}) (PhoneVerify);