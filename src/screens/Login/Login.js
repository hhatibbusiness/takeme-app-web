import React, {useEffect, useRef, useState} from 'react';
import './Login.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {useTranslation} from "react-i18next";
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "../../store/actions/login.action";
import {connect} from "react-redux";

const Login = ({lan, login, logging, data, error, errorMessage}) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [phoneActive, setPhoneActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);

    const navigate = useNavigate();

    const {t} = useTranslation();

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
        (inputRef.current && (inputRef.current.autoComplete = 'off'));
    }, []);

    const formSbumitHandler = e => {
        e.preventDefault();
        const data = {
            phone,
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
                        <label htmlFor="phone" className={`Login__form--element-label ${(phoneActive || phone.length > 0) && 'Login__form--element-label-active'}`}>{t('phone')}</label>
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
                    <NavLink to={'/forget'} className="Login__form--forgetPassword">{t('forget')}</NavLink>
                </div>
                <div className="Login__form--element">
                    <button className="Login__form--button">{logging ? <i className="fa-solid fa-circle-notch"></i> : t('loginbtn')}</button>
                    <p className="Login__form--register">{t('create')}?<NavLink className={'Login__form--register-link'} to={'/register'}>{t('loginregister')}</NavLink></p>
                </div>
            </form>
            {
                error && (
                    <div className='Login__error'>
                        {errorMessage}
                    </div>
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

export default connect(mapStateToProps, {login}) (Login);