import React, {useEffect, useRef, useState} from 'react';
import './Login.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {useTranslation} from "react-i18next";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {login} from "../../store/actions/login.action";
import {connect} from "react-redux";
import {registerError} from "../../store/actions/register.actions";
import AuthenticationError from '../../components/AuthenticationError/AuthenticationError';
import deleteDefaultHeader from '../../utls/remove.axios.headers';
import removeAxiosHeaders from "../../utls/remove.axios.headers";
import {useLocation} from "react-router-dom";
import LoginPopup from "./LoginPopup/LoginPopup";
import {sendForgetPasswordVerificationCode, sendCodePasswordToServer} from "../../store/actions/forget.password.actions";
import {KeepAlive} from "react-activation";

const Login = ({lan, login, logging, data, sendingCode, registerError, error, sendForgetPasswordVerificationCode, errorMessage}) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [phoneActive, setPhoneActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);
    const [type, setType] = useState(true); //if true its password and if its false its text
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();
    const history = useLocation();

    const {t} = useTranslation();

    useEffect(() => {
        localStorage.removeItem('takemetoken');
        localStorage.removeItem('takemeuser');
        removeAxiosHeaders();
    }, []);

    useEffect(() => {
        if(localStorage.getItem('takemeLoginData')) {
            const loginData = JSON.parse(localStorage.getItem('takemeLoginData'));
            setPhone(loginData.username);
            setPassword(loginData.password);
        }
    }, []);

    const browseClickHandler = () => {
        // e.preventDefault();
        localStorage.removeItem('takemetoken');
        localStorage.removeItem('takemeuser')
        navigate('/');
        navigate(0);
    }

    useEffect(() => {
        console.log(history.state);
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
        // registerError('');
        (inputRef.current && (inputRef.current.autoComplete = 'off'));
    }, []);

    const formSbumitHandler = async e => {
        e.preventDefault();
        if(phone.length == 0 && password.length == 0) return registerError(t('phoneandpassworderror'));
        if(phone.length == 0) return registerError(t('phoneoremailerror'));
        if(password.length == 0) return registerError(t('passworderror'));
        const data = {
            phoneOrEmail: phone,
            password
        };

        const res = await login(data, navigate, lan, history);
        if(res.data.status == true && remember == true) {
            const loginData = {
                username: phone,
                password: password
            }
            localStorage.setItem('takemeLoginData', JSON.stringify(loginData));
        } else {
            localStorage.removeItem('takemeLoginData');
        }
    }
    return (
        <KeepAlive cacheKey={'Login'}>
            <div className={'Login'}>
                <Navbar backBtn={true} midText={t('login')} />
                <form onSubmit={formSbumitHandler} autoCorrect={'off'} autoComplete={'off'} className="Login__form">
                    <div className="Login__form--element">
                        <div className="Login__form--element-wrapper">
                            <label htmlFor="phone" className={`Login__form--element-label ${(phoneActive || phone.length > 0) && 'Login__form--element-label-active'}`}>{t('phoneoremail')}</label>
                            <input autoComplete={'off'} value={phone} onChange={e => {
                                setPhone(e.target.value)
                            }} ref={inputRef} onBlur={e => phone.length === 0 && setPhoneActive(false)} onFocus={e => setPhoneActive(true)} name={'phone'} type="text" className="Login__form--element-input" />
                        </div>
                    </div>
                    <div className="Login__form--element">
                        <div className="Login__form--element-wrapper">
                            <label htmlFor="phone" className={`Login__form--element-label ${(passwordActive || password.length > 0) && 'Login__form--element-label-active'}`}>{t('password')}</label>
                            <input autoComplete={'off'} value={password} onChange={e => {
                                setPassword(e.target.value);
                            }} name={'password'} onBlur={e => password.length === 0 && setPasswordActive(false)} onFocus={e => setPasswordActive(true)} type={type ? 'password' : 'text'} className="Login__form--element-input Login__form--element-inputPhone"/>
                            <p onClick={e => setType(!type)} className={'Login__form--element-eye'}>
                                {
                                    type ? (
                                        <span><i className="fa-solid fa-eye Login__form--element-eye-see"></i></span>
                                    ) : (
                                        <span><i className="fa-solid fa-eye-slash Login__form--element-eye-unsee"></i></span>
                                    )
                                }
                            </p>
                        </div>
                        <div onClick={ async e => {
                            registerError('');
                            if(!phone) {
                                registerError(t("emailmessage"));
                                return e.preventDefault();
                            }
                            const validEmail =String(phone)
                                .toLowerCase()
                                .match(
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                );
                            if(!validEmail) {
                                console.log('dlkajsflkdsajflk')
                                registerError(t('emailmessage'))
                                return e.preventDefault();
                            }
                            const data = {
                                email: phone,
                                lan,
                                navigate,
                                history
                            }
                            const res = await sendForgetPasswordVerificationCode(data);
                        }} className="Login__form--forgetPassword"><span>{sendingCode && <i className="fa-solid fa-circle-notch"></i>}</span>{t('forget')}</div>
                        <div className="Login__form--remember">
                            <div className='Register__form--element-input--wrapper'>
                                <input value={remember} onChange={e => {
                                    if(e.target.checked) {
                                        setRemember(true);
                                    } else {
                                        setRemember(false);
                                    }

                                }}  name={'conditions'} type="checkbox" className="Register__form--element-input" />
                                <span></span>
                            </div>
                            <label htmlFor="conditions" className={''}><span>{t('rememberme')}</span></label>
                        </div>
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
                {
                    open && <LoginPopup open={open} message={message} setOpen={setOpen} />
                }
            </div>
        </KeepAlive>
    );
};

const mapStateToProps = (state) => ({
    lan: state.categories.lan,
    logging: state.login.logging,
    data: state.login.data,
    errorMessage: state.login.errorMessage,
    error: state.login.error,
    sendingCode: state.forget.sendingCode
})

export default connect(mapStateToProps, {login, registerError, sendForgetPasswordVerificationCode}) (Login);