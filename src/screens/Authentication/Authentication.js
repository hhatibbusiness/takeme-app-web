import React, { useEffect, useState } from 'react';
import './Authentication.css';
import InputComponent from '../../components/InputComponent/InputComponent';
import emailImage from '../../assets/images/defaults/email.png'
import lockImage from '../../assets/images/defaults/lock.png';
import LoginButton from '../../components/LoginButton/LoginButton';
import logoImage from '../../assets/images/defaults/logo.png';
import GoogleImage from '../../assets/images/defaults/google.png';
import facebookImage from '../../assets/images/defaults/facebook.png';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from '../../store/actions/auth.actions';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import axios from 'axios';
import { BASE_URL } from '../../utls/assets';
import { addAlert } from '../../store/actions/alert.actions';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import FacebookLogin from '../../components/FacebookLogin/FacebookLogin'

const Authentication = ({
    paddingTop,
    authenticateUser,
    setBackBtn,
    setShowIcons,
    locale,
    addAlert
}) => {

    const [email, setEmail] = useState({
        value: '',
        rules: {
            required: {
                valid: false
            },
            isEmail: {
                valid: false
            }
        },
        touched: false,
        errors: [],
        valid: false
    });

    const [password, setPassword] = useState({
        value: '',
        rules: {
            required: {
                valid: false
            },
            minLength: {
                valid: false,
                value: 6
            }
        },
        touched: false,
        valid: false
    });

    const [valid, setValid] = useState(false);

    const [emailErrors, setEmailErrors] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({});
    const [submitted, setSubmitted] = useState(true);
    const [reset, setReset] = useState(false);
    const [params, setParams] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        setShowIcons(false);
        setBackBtn(true);

        return () => {
            setShowIcons(true);
            setBackBtn(false);
        }
    }, []);

    const emailButtonClickHandler = async () => {
        setSubmitted(true);
        if (!valid) return;
        console.log(locale);
        const userData = {
            email: email.value,
            password: password.value,
            navigate,
            locale: locale?.locale,
            authType: 'email',
            localeId: locale?.id
        };

        console.log(password)

        const res = await authenticateUser(userData);

        console.log(res);

        if(res?.response?.status == 401) {
            setEmail({
                ...email,
                valid: false
            });
            setPassword({
                ...password,
                valid: false
            })
        } else if(res?.response?.status == 500) {
            addAlert({
                msg: res.response.data.message,
                alertType: 'danger'
            });
        }
    }

    const inputValidator = (value, rules) => {
        let inputIsValid = true;

        if (rules.required) {
            inputIsValid = value.trim() != '' && inputIsValid;
        }

        if (rules.maxLength) {
            inputIsValid = value.length <= rules.maxLength.value && inputIsValid;
        }

        if(rules.minLength) {
            inputIsValid = value?.length >= rules?.minLength.value && inputIsValid;
        }


        if (rules.isEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            inputIsValid = emailRegex.test(value) && inputIsValid;
        }

        return inputIsValid;
    }

    const emailChangeHandler = value => {
        setSubmitted(false);

        const isValid = inputValidator(value, email.rules);


        setEmail({
            ...email,
            value: value,
            touched: true,
            valid: inputValidator(value, email.rules),
            
        });

        setValid(isValid && password.valid);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setEmailErrors({})
        if (email.rules.required && value.trim().length == 0) {
            setEmailErrors({
                ...emailErrors,
                required: {
                    message: 'ادخل الايميل'
                }
            });
        } else if (email.rules.isEmail && !emailRegex.test(value)) {
            setEmailErrors({
                ...emailErrors,
                isEmail: {
                    message: 'مطلوب ايميل'
                }
            })
        }
    }

    const passwordChangeHandler = value => {
        setSubmitted(false);

        const isValid = inputValidator(value, password?.rules);

        setPassword({
            ...password,
            value: value,
            touched: true,
            valid: isValid
        });

        setValid(isValid && email.valid);

        setPasswordErrors({});

        const minLength = value?.length >= password.rules.minLength.value;

        if (password.rules.required && value?.trim().length == 0) {
            setPasswordErrors({
                ...passwordErrors,
                required: {
                    message: 'ادخل كلمة المرور'
                }
            });
        } else if (password.rules.minLength && !minLength) {
            setPasswordErrors({
                ...passwordErrors,
                minLength: {
                    message: 'أقل طول هو 6 حروف '
                }
            })
        }
    }

    const changePasswordClickHandler = async () => {
        try {
            setSubmitted(true);
            // if (!email.valid) return;
            const data = {
                localeId: locale?.id,
                userAuthenticationRequestDto: {
                    authType: 'email',
                    authValue: email.value,
                    password: 'fldjakdl'
                }
            }

            const doesExist = await axios.post(`${BASE_URL}endpoints/users/verify-email-and-send-code?mLocale=${locale?.locale}`, data);

            if (doesExist.status == 200) {
                navigate(`/confirm/email/change/password/${email.value}/${password.value}`);
            }
        } catch (e) {
            console.log(e.response);
            if (e?.response?.status == 404 || e?.response?.status == 404) {
                setEmailErrors({
                    ...emailErrors,
                    backend: {
                        message: e?.response?.data?.error
                    }
                });
                setEmail({
                    ...email,
                    valid: false
                })
                setSubmitted(true);
            } else {
                addAlert({
                    alertType: 'danger',
                    msg: e?.response?.data?.error
                });
            }
        }
    }

    useEffect( () => {
        console.log(window.location);
        const getParamsFun = async () => {
            const getParams = new URLSearchParams(window.location.search);
            console.log(getParams);
            const resetV = await getParams.get('reset');
            setReset(resetV);
        }

        getParamsFun();
    }, [window.location]);

    const getParams = () => {
        return new URLSearchParams(window.location.search);
    }

    return (
        <div style={{paddingTop: `${paddingTop + 40}px`}} className='Authentication'>
            <div className='Authentication__message'>
                <p>انضم لنا لتحصل على ما ترغب به و تحتاجه
                بسرعة وسهولة، ولتزيد من سعادتك</p>
            </div>
            <div className='Authentication__container'>
                <div id={'Authentication__email'} className='Authentication__element'>
                    <InputComponent
                        icon={emailImage}
                        type='text'
                        placeholder={'الايميل للدخول او الانضمام'}
                        value={email.value}
                        setValue={emailChangeHandler}
                        touched={email.touched}
                        valid={email.valid}
                        submitted={submitted}
                    />
                    {
                        Object.keys(emailErrors).length > 0 && submitted && (
                            <ul className='Authentication__errors--list'>
                                {
                                    Object.keys(emailErrors).map((error) => (
                                        <li>{ emailErrors[error].message }</li>
                                    ))
                                }
                            </ul>
                        ) 
                    }
                </div>
                <div id={'Authentication__password'} className='Authentication__element'>
                    <InputComponent
                        icon={lockImage}
                        type='password'
                        placeholder={'كلمة المرور'}
                        value={password.value}
                        setValue={passwordChangeHandler}
                        touched={password.touched}
                        valid={password.valid}
                        submitted={submitted}
                    />
                    {
                        Object.keys(passwordErrors).length > 0 && submitted && (
                            <ul className='Authentication__errors--list'>
                                {
                                    Object.keys(passwordErrors).map((error) => (
                                        <li>{ passwordErrors[error].message }</li>
                                    ))
                                }
                            </ul>
                        ) 
                    }

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
                    />
                </div>
            </div> 
            <div className='Authentication__password--reset'>
                <p>في حال لديك حساب يمكنك <span onClick={changePasswordClickHandler}>تغيير كلمة المرور</span> </p>
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
                    <span onClick={e => {
                        navigate('/contract')
                    }} className='Authentication__conditions--link'>شروط الخدمة </span>
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
    )
}

const mapStateToProps = state => ({
    locale: state.categories.selectedLocale
});

export default connect(mapStateToProps, {authenticateUser, addAlert}) (Authentication);