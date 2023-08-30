import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import './EmailVerify.scss';
import {connect} from "react-redux";
import SpinnerComponent from "../../Spinner/Spinner.Component";

const PhoneVerify = ({step, setStep, buttonText, buttonLink, form, sendCodeFun, sendingCode, lan, sendCodeToServerFun, sendingCodeToServer}) => {
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [code5, setCode5] = useState('');
    const [code6, setCode6] = useState('');
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
        inputs[code1.length].focus();
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
                    <input ref={input1Ref} value={code1} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode1(e.target.value);
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input2Ref?.current?.focus();
                        }
                    }} type="text" className="PhoneVerify__input"/>
                    <input ref={input2Ref} value={code2} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode2(e.target.value);
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input3Ref?.current?.focus();
                        }
                    }} type="text" className="PhoneVerify__input"/>
                    <input ref={input3Ref} value={code3} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode3(e.target.value);
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input4Ref?.current?.focus();
                        }
                    }} type="text" className="PhoneVerify__input"/>
                    <input ref={input4Ref} value={code4} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode4(e.target.value);
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input5Ref?.current?.focus();
                        }
                    }} type="text" className="PhoneVerify__input"/>
                    <input ref={input5Ref} value={code5} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode5(e.target.value);
                        if (e.target.value.length >= 1) {
                            e.target.blur();
                            input6Ref?.current?.focus();
                        }
                    }} type="text" className="PhoneVerify__input"/>
                    <input ref={input6Ref} value={code6} onChange={e => {
                        if (e.target.value.length > 1) return;
                        setCode6(e.target.value);
                    }} type="text" className="PhoneVerify__input"/>
                </form>
                <div className="Register__form--element">
                    <button className="Register__form--button" onClick={async e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if(!code1 || !code2 || !code3 || !code4 || !code5 || !code6) return;
                        const data = {
                            email: form.email,
                            lan,
                            setStep,
                            code: `${code1}${code2}${code3}${code4}${code5}${code6}`
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

export default connect(mapStateToProps, {}) (PhoneVerify);