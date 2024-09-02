import React, {useEffect, useRef, useState} from 'react';
import './Login.scss';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {loginProvider as login} from "../../store/actions/login.action";
import {connect} from "react-redux";
import {registerError} from "../../store/actions/register.actions";
import AuthenticationError from '../../components/AuthenticationError/AuthenticationError';
import {useLocation} from "react-router-dom";
import LoginPopup from "./LoginPopup/LoginPopup";
import {sendForgetPasswordVerificationCode, sendCodePasswordToServer} from "../../store/actions/forget.password.actions";
import {KeepAlive} from "react-activation";
import {changeNavbarAssets} from "../../store/actions/ui.actions";

const Login = ({lan, login, setBackBtn, logging, setShowIcons, changeNavbarAssets, registerError, error, errorMessage}) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [phoneActive, setPhoneActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);
    const [type, setType] = useState(true); //if true its password and if its false its text
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();
    const history = useLocation();

    const {t} = useTranslation();

    useEffect(() => {
        setBackBtn(true);
        setShowIcons(false);
        return () => {
            setBackBtn(false)
            setShowIcons(true);
        }
    }, []);

    useEffect(() => {
        if(localStorage.getItem('takemeLoginData')) {
            const loginData = JSON.parse(localStorage.getItem('takemeLoginData'));
            setPhone(loginData.username);
            setPassword(loginData.password);
        }
    }, []);

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
        if(res?.data?.status == true && remember == true) {
            const loginData = {
                username: phone,
                password: password
            }
            localStorage.setItem('takemeLoginData', JSON.stringify(loginData));
        } else {
            localStorage.removeItem('takemeLoginData');
        }
    }

    useEffect(() => {
        const data = {
            searchPage: false,
            backBtn: true,
            step: null,
            setStep: null,
            search: false,
            midText: t('login'),
            logoLink: '/'
        }
        changeNavbarAssets(data);
    }, []);

    useEffect(() => {
        return () => {
            const data = {
                // assets: assets,
                searchPage: false,
                term: '',
                backBtn: false,
                step: null,
                setStep: null,
                search: true,
                logoLink: '/'
            };
            console.log(data);
            changeNavbarAssets(data);
        }
    }, []);
    return (
        <KeepAlive cacheKey={'Login'}>
            <div id={'Login'} className={'Login'}>
                {/*<Navbar backBtn={true} midText={t('login')} />*/}
                <form id={'Login__form'} onSubmit={formSbumitHandler} autoCorrect={'off'} autoComplete={'off'} className="Login__form">
                    <div id={'Login__form--username'} className="Login__form--element">
                        <div id={'Login__form--username-wrapper'} className="Login__form--element-wrapper">
                            <label id={'Login__form--username-label'} htmlFor="phone" className={`Login__form--element-label ${(phoneActive || phone.length > 0) && 'Login__form--element-label-active'}`}>{t('phoneoremail')}</label>
                            <input id={'Login__form--username-input'} autoComplete={'off'} value={phone} onChange={e => {
                                setPhone(e.target.value)
                            }} ref={inputRef} onBlur={e => phone.length === 0 && setPhoneActive(false)} onFocus={e => setPhoneActive(true)} name={'phone'} type="text" className="Login__form--element-input" />
                        </div>
                    </div>
                    <div id={'Login__form--password'} className="Login__form--element">
                        <div id={'Login__form--password-wrapper'} className="Login__form--element-wrapper">
                            <label id={'Login__form--password-label'} htmlFor="phone" className={`Login__form--element-label ${(passwordActive || password.length > 0) && 'Login__form--element-label-active'}`}>{t('password')}</label>
                            <input id={'Login__form--password-input'} autoComplete={'off'} value={password} onChange={e => {
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
                        <div id={'Login__form--remember'} className="Login__form--remember">
                            <div id={'Login__form--remember-wrapper'} className='Register__form--element-input--wrapper'>
                                <input id={'Login__form--remember-checkbox'} value={remember} onChange={e => {
                                    if(e.target.checked) {
                                        setRemember(true);
                                    } else {
                                        setRemember(false);
                                    }

                                }}  name={'conditions'} type="checkbox" className="Register__form--element-input" />
                                <span></span>
                            </div>
                            <label id={'Login__form--remember-label'} htmlFor="conditions" className={''}><span>{t('rememberme')}</span></label>
                        </div>
                    </div>

                    <div id={'Login__form--submit'} className="Login__form--element">
                        <button id={'Login__form--submit-button'} className="Login__form--button">{logging ? <i className="fa-solid fa-circle-notch"></i> : t('loginbtn')}</button>
                        {/*<p id={'Login__form--register'} className="Login__form--register">{t('create')}?<NavLink className={'Login__form--register-link'} to={'/register'}>{t('loginregister')}</NavLink></p>*/}
                    </div>
                    {/*<div className="Login__from--element Login__form--browse">*/}
                    {/*    <span>{t('or')}</span>*/}
                    {/*    <span onClick={browseClickHandler}>{t('browse')}</span>*/}
                    {/*</div>*/}
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

export default connect(mapStateToProps, {changeNavbarAssets, login, registerError, sendForgetPasswordVerificationCode}) (React.memo(Login));