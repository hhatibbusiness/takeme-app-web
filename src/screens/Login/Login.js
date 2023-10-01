import React, {useEffect, useRef, useState} from 'react';
import './Login.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {useTranslation} from "react-i18next";
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "../../store/actions/login.action";
import {connect} from "react-redux";
import {registerError} from "../../store/actions/register.actions";
import AuthenticationError from '../../components/AuthenticationError/AuthenticationError';

const Login = ({lan, login, logging, data, registerError, error, errorMessage}) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [phoneActive, setPhoneActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);

    const navigate = useNavigate();

    const {t} = useTranslation();

    useEffect(() => {
        localStorage.removeItem('takemetoken');
        localStorage.removeItem('takemeuser')
    }, []);

    const browseClickHandler = () => {
        // e.preventDefault();
        localStorage.removeItem('takemetoken');
        localStorage.removeItem('takemeuser')
        navigate('/');
        navigate(0);
    }

    useEffect(() => {
        browseClickHandler();
    }, []);

    useEffect(() => {
        const home = document.querySelector('body');

        const freezeStyles = () => {
            // home && (home.style.height = '100vh')
            home.classList.add('Home__hide')
        }
        const releaseStyles = () => {
            home.classList.remove('Home__hide')
        }

        freezeStyles();

        return () => {
            releaseStyles();
        }

    }, []);

    const inputRef = useRef()

    useEffect(() => {
        registerError('');
        (inputRef.current && (inputRef.current.autoComplete = 'off'));
    }, []);

    const formSbumitHandler = e => {
        e.preventDefault();
        if(phone.length == 0 && password.length == 0) return registerError(t('phoneandpassworderror'));
        if(phone.length == 0) return registerError(t('phoneoremailerror'));
        if(password.length == 0) return registerError(t('passworderror'));
        const data = {
            phoneOrEmail: phone,
            password
        };

        login(data, navigate, lan);
    }
    return (
        <div className={'Login'}>
            <Navbar backBtn={true} midText={t('login')} />
            <form onSubmit={formSbumitHandler} autoCorrect={'off'} autoComplete={'off'} className="Login__form">
                <div className="Login__form--element">
                    <div className="Login__form--element-wrapper">
                        <label htmlFor="phone" className={`Login__form--element-label ${(phoneActive || phone.length > 0) && 'Login__form--element-label-active'}`}>{t('phoneoremail')}</label>
                        <input value={phone} onChange={e => {
                            setPhone(e.target.value)
                        }} ref={inputRef} onBlur={e => phone.length === 0 && setPhoneActive(false)} onFocus={e => setPhoneActive(true)} name={'phone'} type="text" className="Login__form--element-input" />
                    </div>
                </div>
                <div className="Login__form--element">
                    <div className="Login__form--element-wrapper">
                        <label htmlFor="phone" className={`Login__form--element-label ${(passwordActive || password.length > 0) && 'Login__form--element-label-active'}`}>{t('password')}</label>
                        <input value={password} onChange={e => {
                            setPassword(e.target.value);
                        }} name={'phone'} onBlur={e => password.length === 0 && setPasswordActive(false)} onFocus={e => setPasswordActive(true)} type="password" className="Login__form--element-input Login__form--element-inputPhone"/>
                    </div>
                    <NavLink to={`/forget/${phone}`} onClick={e => {
                        if(!phone) {
                            alert('Please, enter an email!')
                            return e.preventDefault();
                        }
                        const validEmail =String(phone)
                            .toLowerCase()
                            .match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            );
                        if(!validEmail) {
                            alert('Please, enter a valid email!')
                            return e.preventDefault();
                        }
                    }} className="Login__form--forgetPassword">{t('forget')}</NavLink>
                </div>
                <div className="Login__form--element">
                    <button className="Login__form--button">{logging ? <i className="fa-solid fa-circle-notch"></i> : t('loginbtn')}</button>
                    <p className="Login__form--register">{t('create')}?<NavLink className={'Login__form--register-link'} to={'/register'}>{t('loginregister')}</NavLink></p>
                </div>
                <div className="Login__from--element Login__form--browse">
                    <span>{t('or')}</span>
                    <span onClick={browseClickHandler}>{t('browse')}</span>
                </div>
            </form>
            {
                error && (
                    <AuthenticationError errorMessage={errorMessage} />
                )
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    lan: state.categories.lan,
    logging: state.login.logging,
    data: state.login.data,
    errorMessage: state.login.errorMessage,
    error: state.login.error
})

export default connect(mapStateToProps, {login, registerError}) (Login);