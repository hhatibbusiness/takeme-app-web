import React, {useCallback, useEffect, useState} from 'react';
import './Authentication.css';
import InputComponent from '../../components/InputComponent/InputComponent';
import emailImage from '../../assets/images/defaults/email.png';
import lockImage from '../../assets/images/defaults/lock.png';
import LoginButton from '../../components/LoginButton/LoginButton';
import logoImage from '../../assets/images/defaults/logo.png';
import GoogleImage from '../../assets/images/defaults/google.png';
import facebookImage from '../../assets/images/defaults/facebook.png';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from '../../store/actions/auth.actions';
import { addAlert, removeAlert } from '../../store/actions/alert.actions';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
import {BASE_URL} from "../../utls/assets";
import axios from "axios";
import ResetPassword from "../../components/ResetPassword/ResetPassword";

const Authentication = ({
    paddingTop,
    authenticateUser,
    setBackBtn,
    setShowIcons,
    locale,
    addAlert,
    removeAlert,
    y,
    setY,
    topValue,
    setTopValue,
    navHeight,
    bodyContainerRef
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [valid, setValid] = useState(false);
    const [reset, setReset] = useState(false);
    const [params, setParams] = useState(null);
    const [resetClickSpin, setResetClickSpin] = useState(false);
    const [registerClickSpin, setRegisterClickSpin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setShowIcons(false);
        setBackBtn(true);

        return () => {
            setShowIcons(true);
            setBackBtn(false);
        }
    }, []);

    const handleWindowScroll = useCallback( e => {
        if(Math.floor(y) > Math.floor(window.scrollY)) {
            setY(window.scrollY);
            if(topValue + (y - window.scrollY) > 0) {
                return setTopValue(0);
            }
            setTopValue(topValue + (y - window.scrollY));
        } else if(Math.floor(y) < Math.floor(window.scrollY)) {
            if(window.scrollY - y > Math.abs(navHeight) - Math.abs(topValue)) {
                setY(window.scrollY);
                return setTopValue(-navHeight);
            };
            if(window.scrollY - y + topValue < -navHeight) {
                setY(window.scrollY);
                return setTopValue(-navHeight);
            };
            setTopValue(topValue - (window.scrollY - y));
            setY(window.scrollY);
        }
    }, [y]);

    useEffect(() => {
        const container = bodyContainerRef.current;
        if(container) {
            setY(window.scrollY);
            window.addEventListener('scroll', handleWindowScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        }
    }, [handleWindowScroll, bodyContainerRef.current]);



    const emailChangeHandler = (value) => {
        removeAlert();
        setEmail(value);
        setEmailError('');
    };

    const passwordChangeHandler = (value) => {
        removeAlert();
        setPassword(value);
        setPasswordError('');
    };

    const validateInputs = () => {
        let validEmail = true;
        let validPassword = true;

        // Email validation
        if (!email.trim()) {
            validEmail = false;
            setEmailError('الرجاء إدخال البريد الإلكتروني');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validEmail = false;
            setEmailError('الرجاء إدخال بريد إلكتروني صحيح');
        }

        // Password validation
        if (!password.trim()) {
            validPassword = false;
            setPasswordError('الرجاء إدخال كلمة المرور');
        } else if (password.length < 6) {
            validPassword = false;
            setPasswordError('أقل طول لكلمة المرور هو 6 حروف');
        }

        setValid(validEmail && validPassword);
        return validEmail && validPassword;
    };

    const emailButtonClickHandler = async () => {
        removeAlert();
        setSubmitted(true);
        if (!validateInputs()) return;

        setRegisterClickSpin(true);

        const userData = {
            email: email,
            password: password,
            navigate,
            locale: locale?.locale,
            authType: 'email',
            localeId: locale?.id
        };

        const res = await authenticateUser(userData);

        if (res?.response?.status === 401) {
            setEmailError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
            setPasswordError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        } else if (res?.response?.status === 500) {
            addAlert({
                msg: res.response.data.message,
                alertType: 'danger'
            });
        }

        setRegisterClickSpin(false);
    };

    const changePasswordClickHandler = async () => {
        try {
            removeAlert();
            setSubmitted(true);
            let validEmail = true;
            if (!email.trim()) {
                validEmail = false;
                setEmailError('الرجاء إدخال البريد الإلكتروني');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                validEmail = false;
                setEmailError('الرجاء إدخال بريد إلكتروني صحيح');
            }

            if(!validEmail) return;

            setResetClickSpin(true);

            // if (!email.valid) return;
            const data = {
                localeId: locale?.id,
                userAuthenticationRequestDto: {
                    authType: 'email',
                    authValue: email,
                    password: 'fldjakdl'
                }
            }

            const doesExist = await axios.post(`${BASE_URL}endpoints/users/verify-email-and-send-code?mLocale=${locale?.locale}`, data);

            if (doesExist.status == 200) {
                navigate(`/confirm/email/change/password/${email}`);
            }
            setResetClickSpin(false);
        } catch (e) {
            console.log(e.response);
            if (e?.response?.status == 404 || e?.response?.status == 404) {
                setEmailError(
                        e?.response?.data?.message
                    );
                // setEmail({
                //     ...email,
                //     valid: false
                // })
                setSubmitted(true);
            } else {
                console.log(e?.response?.data?.message);
                addAlert({
                    alertType: 'danger',
                    msg: e?.response?.data?.message
                });
            }
            setResetClickSpin(false);
        }
    }

    useEffect( () => {
        const getParamsFun = async () => {
            const getParams = new URLSearchParams(window.location.search);
            const resetV = await getParams.get('reset');
            setReset(resetV);
        }

        getParamsFun();
    }, [window.location]);

    const getParams = () => {
        return new URLSearchParams(window.location.search);
    }

    useEffect(() => {
        return () => {
            removeAlert();
        }
    }, []);

    return (
        <div style={{paddingTop: `${paddingTop + 40}px`}} className='Authentication'>
            <div className='Authentication__message'>
                <p>انضم لنا لتحصل على ما ترغب به و تحتاجه بسرعة وسهولة، ولتزيد من سعادتك</p>
            </div>
            <div className='Authentication__container'>
                <div id={'Authentication__email'} className='Authentication__element'>
                    <InputComponent
                        icon={emailImage}
                        type='text'
                        placeholder={'الايميل للدخول او الانضمام'}
                        value={email}
                        setValue={emailChangeHandler}
                        touched={submitted}
                        valid={!emailError}
                    />
                    {submitted && emailError && (
                        <ul className='Authentication__errors--list'>
                            <li>{emailError}</li>
                        </ul>
                    )}
                </div>
                <div id={'Authentication__password'} className='Authentication__element'>
                    <InputComponent
                        icon={lockImage}
                        type='password'
                        placeholder={'كلمة المرور'}
                        value={password}
                        setValue={passwordChangeHandler}
                        touched={submitted}
                        valid={!passwordError}
                    />
                    {submitted && passwordError && (
                        <ul className='Authentication__errors--list'>
                            <li>{passwordError}</li>
                        </ul>
                    )}
                </div>
                <div id={'Authentication__button'} style={{marginTop: '40px'}} className='Authentication__button'>
                    <LoginButton
                        value={'ادخل باستخدام تيكمي'}
                        icon={logoImage}
                        backColor={'#07AB83'}
                        color={'white'}
                        borderColor={'transparent'}
                        separatorColor={'white'}
                        fontWeight={700}
                        clickFun={emailButtonClickHandler}
                        hasImage={true}
                        spin={registerClickSpin}
                    />
                </div>
            </div>
            <div className='Authentication__password--reset'>
                <p>في حال لديك حساب يمكنك <span className={'Authentication__password--reset-click'} onClick={changePasswordClickHandler}>تغيير كلمة المرور</span>{resetClickSpin &&
                    <i className="fa-solid fa-circle-notch"></i>}</p>
            </div>
            <div className='Authentication__or'>
                <div className='Authentication__hl'></div>
                <span>أو</span>
                <div className='Authentication__hl'></div>
            </div>
            <div className='Authentication__button'>
                <GoogleLogin
                    icon={GoogleImage}
                    value={"ادخل باستخدام جوجل"}
                    color={'#666666'}
                    backColor={'white'}
                    borderColor={'#E5E5E5'}
                    separatorColor={'#E5E5E5'}
                    fontWeight={400}
                    hasImage={true}
                />
            </div>
            <div className='Authentication__button'>
                <FacebookLogin
                    icon={facebookImage}
                    value={"ادخل باستخدام فيسبوك"}
                    color={'white'}
                    backColor={'#1877f2'}
                    borderColor={'transparent'}
                    separatorColor={'white'}
                    fontWeight={400}
                    hasImage={true}
                />
            </div>

            <div className='Authentication__conditions'>
                <p>
                    <span>عند انضمامك لنا أو تسجيلك معنا, فإنك توافق على </span>
                    <span onClick={() => navigate('/contract')}
                          className='Authentication__conditions--link'>شروط الخدمة </span>
                    <span>و</span>
                    <span className='Authentication__conditions--link'>سياسية الخصوصية </span>
                    <span>الخاصة بنا.</span>
                </p>
            </div>
            {
                reset && <ResetPassword params={getParams()} email={params?.get('email')} setResetting={setReset} resetting={reset} />
            }
            {
                reset && <div onClick={e => {
                    setReset(false);
                }} className='Authentication__backdrop'></div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    locale: state.categories.selectedLocale
});

export default connect(mapStateToProps, {removeAlert, authenticateUser, addAlert})(Authentication);
